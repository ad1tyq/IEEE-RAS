'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// ─────────────────────────────────────────────────────────────────────────────
// UnlockDBackground — realistic glass padlock hero (Three.js).
//
// A fixed full-screen WebGL canvas rendering a premium glass padlock with a
// biometric fingerprint scanner, lit by an in-code studio environment, over a
// drifting starfield. It is driven by the pinned-hero scroll (see page.tsx + CSS):
//
//   progress = clamp(scrollY / (innerHeight * 2.5), 0, 1)
//
//   • spin 360° → fingerprint scan → authenticate (cyan → green) → shackle unlocks
//   • holds unlocked, then translates up 1:1 with the page scroll once the pin
//     releases, so the lock and the content scroll away together as one flow
//   • cursor parallax, scroll-speed bloom, DPR cap, low-power + reduced-motion
//     fallbacks, and full disposal of every GL resource on unmount
//
// PHOTOREAL MODE: drop a real HDRI at `public/env.hdr` and it auto-loads for
// richer reflections (falls back to the in-code studio environment if absent).
//
// Requires:  npm install three   &&   npm install -D @types/three
// ─────────────────────────────────────────────────────────────────────────────

export default function UnlockDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability before Three.js touches the canvas
    // (avoids "Cannot read properties of null (reading 'precision')" in
    //  Strict Mode where a previous mount's forceContextLoss persists).
    const glTest =
      canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!glTest) return;

    let disposed = false;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navAny = navigator as Navigator & { deviceMemory?: number };
    const lowPerf =
      (navAny.hardwareConcurrency || 4) <= 4 ||
      (navAny.deviceMemory ?? 8) <= 4 ||
      window.innerWidth < 768;

    const dpr = Math.min(window.devicePixelRatio || 1, lowPerf ? 1 : 1.5);
    const useBloom = !lowPerf;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smoothstep = (e0: number, e1: number, x: number) => {
      const t = clamp((x - e0) / (e1 - e0), 0, 1);
      return t * t * (3 - 2 * t);
    };

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPerf, powerPreference: 'high-performance' });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x020510, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const rAny = renderer as unknown as { transmissionResolutionScale?: number };
    if ('transmissionResolutionScale' in rAny) rAny.transmissionResolutionScale = lowPerf ? 0.5 : 1.0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6.6);

    // ── Studio environment (bright softboxes → believable glass reflections) ──
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    function buildStudioEnv(): { env: THREE.Scene; trash: Array<{ dispose: () => void }> } {
      const s = new THREE.Scene();
      const trash: Array<{ dispose: () => void }> = [];
      const backGeo = new THREE.SphereGeometry(30, 24, 24);
      const backMat = new THREE.MeshBasicMaterial({ color: 0x0b1a33, side: THREE.BackSide });
      s.add(new THREE.Mesh(backGeo, backMat));
      trash.push(backGeo, backMat);
      const O = new THREE.Vector3(0, 0, 0);
      const panel = (w: number, h: number, color: number, intensity: number, p: [number, number, number]) => {
        const g = new THREE.PlaneGeometry(w, h);
        const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.set(p[0], p[1], p[2]);
        mesh.lookAt(O);
        s.add(mesh);
        trash.push(g, m);
      };
      panel(14, 14, 0xffffff, 4.0, [7, 9, 9]);
      panel(11, 18, 0xeaf4ff, 2.4, [-11, 3, 5]);
      panel(12, 9, 0xffffff, 3.0, [-2, 5, -12]);
      panel(10, 10, 0x5f9fd8, 1.9, [3, -7, 6]);
      panel(6, 6, 0xffffff, 5.0, [5, 6, 7]);
      panel(22, 2.4, 0xffffff, 3.2, [-3, 7, 7]);
      return { env: s, trash };
    }

    const { env, trash: envTrash } = buildStudioEnv();
    let envRT: THREE.WebGLRenderTarget | null = pmrem.fromScene(env, 0.03);
    scene.environment = envRT.texture;
    envTrash.forEach((d) => d.dispose());

    // Photoreal upgrade if public/env.hdr exists.
    new HDRLoader().load(
      '/env.hdr',
      (hdr) => {
        if (disposed) { hdr.dispose(); return; }
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        const rt = pmrem.fromEquirectangular(hdr);
        scene.environment = rt.texture;
        hdr.dispose();
        envRT?.dispose();
        envRT = rt;
      },
      undefined,
      () => { /* no env.hdr — keep the in-code studio */ },
    );

    const keyL = new THREE.DirectionalLight(0xffffff, 1.4); keyL.position.set(4, 6, 6); scene.add(keyL);
    const rimL = new THREE.DirectionalLight(0x6fa6e6, 1.2); rimL.position.set(-5, -1, -4); scene.add(rimL);
    scene.add(new THREE.AmbientLight(0x24416f, 0.35));

    // ── Procedural smudge/roughness map ──
    function smudgeTexture(size = 512): THREE.CanvasTexture {
      const c = document.createElement('canvas'); c.width = c.height = size;
      const x = c.getContext('2d')!;
      x.fillStyle = '#7a7a7a'; x.fillRect(0, 0, size, size);
      for (let i = 0; i < 70; i++) {
        const r = 40 + Math.random() * 150, gx = Math.random() * size, gy = Math.random() * size;
        const g = x.createRadialGradient(gx, gy, 0, gx, gy, r);
        const sh = 90 + Math.floor(Math.random() * 90);
        g.addColorStop(0, `rgba(${sh},${sh},${sh},0.5)`); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = g; x.fillRect(0, 0, size, size);
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
    }
    const roughTex = smudgeTexture();

    // micro-surface normal map (subtle bumps so reflections ripple like real glass)
    function normalFromNoise(size = 512, strength = 2.2): THREE.CanvasTexture {
      const h = document.createElement('canvas'); h.width = h.height = size;
      const hx = h.getContext('2d')!;
      hx.fillStyle = '#808080'; hx.fillRect(0, 0, size, size);
      for (let i = 0; i < 150; i++) {
        const r = 8 + Math.random() * 55, gx = Math.random() * size, gy = Math.random() * size;
        const v = Math.random() < 0.5 ? 255 : 0;
        const g = hx.createRadialGradient(gx, gy, 0, gx, gy, r);
        g.addColorStop(0, `rgba(${v},${v},${v},0.22)`); g.addColorStop(1, 'rgba(128,128,128,0)');
        hx.fillStyle = g; hx.fillRect(0, 0, size, size);
      }
      const src = hx.getImageData(0, 0, size, size).data;
      const out = document.createElement('canvas'); out.width = out.height = size;
      const ox = out.getContext('2d')!; const img = ox.createImageData(size, size);
      const at = (x: number, y: number) => src[(((y + size) % size) * size + ((x + size) % size)) * 4];
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const dx = (at(x + 1, y) - at(x - 1, y)) / 255 * strength, dy = (at(x, y + 1) - at(x, y - 1)) / 255 * strength;
        const len = Math.hypot(-dx, -dy, 1); const i = (y * size + x) * 4;
        img.data[i] = (-dx / len * 0.5 + 0.5) * 255; img.data[i + 1] = (-dy / len * 0.5 + 0.5) * 255;
        img.data[i + 2] = (1 / len * 0.5 + 0.5) * 255; img.data[i + 3] = 255;
      }
      ox.putImageData(img, 0, 0);
      const t = new THREE.CanvasTexture(out); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
    }
    const normalTex = normalFromNoise();

    // glowing fingerprint texture (biometric scanner motif)
    function fingerprintTexture(size = 512): THREE.CanvasTexture {
      const c = document.createElement('canvas'); c.width = c.height = size;
      const x = c.getContext('2d')!;
      x.clearRect(0, 0, size, size); x.lineCap = 'round'; x.strokeStyle = 'rgba(205,242,255,1)'; x.lineWidth = 5.5;
      const cx = size / 2, cy = size / 2;
      for (let i = 0; i < 11; i++) {
        const rx = 18 + i * 19, ry = 22 + i * 21;
        x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, Math.PI * 0.18, Math.PI * 0.82); x.stroke();
        x.beginPath(); x.ellipse(cx, cy - 4, rx, ry, 0, Math.PI * 1.22, Math.PI * 1.78); x.stroke();
      }
      x.beginPath(); x.ellipse(cx, cy, 9, 12, 0, 0, Math.PI * 2); x.stroke();
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
    }

    const disposables: Array<{ dispose: () => void }> = [roughTex, normalTex];
    const track = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

    // ── Premium glass materials ──
    const bodyMat = track(new THREE.MeshPhysicalMaterial({
      color: 0x4a8ad6, metalness: 0, roughness: 0.14, roughnessMap: roughTex,
      normalMap: normalTex, normalScale: new THREE.Vector2(0.1, 0.1),
      transmission: 0.82, thickness: 1.4, ior: 1.5,
      attenuationColor: new THREE.Color(0x6aa6e6), attenuationDistance: 1.8,
      clearcoat: 1, clearcoatRoughness: 0.06,
      iridescence: 0.3, iridescenceIOR: 1.3,
      envMapIntensity: 1.7, specularIntensity: 1.0,
      emissive: new THREE.Color(0x123a72), emissiveIntensity: 0.16, transparent: true,
    }));
    const shackleMat = track(new THREE.MeshPhysicalMaterial({
      color: 0x9fc9ee, metalness: 0, roughness: 0.08, roughnessMap: roughTex,
      normalMap: normalTex, normalScale: new THREE.Vector2(0.07, 0.07),
      transmission: 0.85, thickness: 0.9, ior: 1.5,
      clearcoat: 1, clearcoatRoughness: 0.05,
      iridescence: 0.25, iridescenceIOR: 1.3,
      envMapIntensity: 1.9, specularIntensity: 1.0,
      emissive: new THREE.Color(0x1d447e), emissiveIntensity: 0.18, transparent: true,
    }));

    const BODY_W = 1.7, BODY_H = 1.6, BODY_D = 0.8, BODY_R = 0.32;
    const seg = lowPerf ? 5 : 8;
    const lock = new THREE.Group();
    const bodyGeo = track(new RoundedBoxGeometry(BODY_W, BODY_H, BODY_D, seg, BODY_R));
    lock.add(new THREE.Mesh(bodyGeo, bodyMat));

    // ── Faint low-poly cage edges over the body (subtle tech accent) ──
    const lineMat = track(new THREE.LineBasicMaterial({ color: 0x8fd8ff, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }));
    const proxyGeo = track(new RoundedBoxGeometry(BODY_W * 1.005, BODY_H * 1.005, BODY_D * 1.005, 1, BODY_R));
    const edgesGeo = track(new THREE.EdgesGeometry(proxyGeo, 24));
    lock.add(new THREE.LineSegments(edgesGeo, lineMat));

    // ── Fresnel rim glow ──
    const rimMat = track(new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(0x49b0ff) }, uPower: { value: 3.0 }, uIntensity: { value: 0.7 } },
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform vec3 uColor; uniform float uPower; uniform float uIntensity; varying vec3 vN; varying vec3 vV;
        void main(){ float f=pow(1.0-max(dot(vN,vV),0.0),uPower); gl_FragColor=vec4(uColor*f*uIntensity, f*0.85); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    lock.add(new THREE.Mesh(bodyGeo, rimMat));

    // ── Real embossed shield (raised glass) + metallic recessed keyhole ──
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(-0.42, 0.42); shieldShape.lineTo(0.42, 0.42); shieldShape.lineTo(0.42, 0.0);
    shieldShape.quadraticCurveTo(0.42, -0.42, 0.0, -0.62); shieldShape.quadraticCurveTo(-0.42, -0.42, -0.42, 0.0); shieldShape.closePath();
    const shieldGeo = track(new THREE.BufferGeometry().setFromPoints(shieldShape.getPoints(72)));
    const shieldExtrude = track(new THREE.ExtrudeGeometry(shieldShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }));
    const emblemMat = track(new THREE.LineBasicMaterial({ color: 0xaeeaff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
    // fingerprint (biometric) scanner instead of a keyhole
    const padMat = track(new THREE.MeshStandardMaterial({ color: 0x08182e, metalness: 0.6, roughness: 0.4, envMapIntensity: 1.2 }));
    const fpTex = track(fingerprintTexture());
    const fpMat = track(new THREE.MeshBasicMaterial({ map: fpTex, color: 0x9fe6ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, toneMapped: false, opacity: 0.95 }));
    const bezelMat = track(new THREE.MeshBasicMaterial({ color: 0x49b0ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, toneMapped: false, opacity: 0.6 }));
    const padGeo = track(new THREE.CircleGeometry(0.25, 44));
    const fpGeo = track(new THREE.PlaneGeometry(0.46, 0.46));
    const bezelGeo = track(new THREE.TorusGeometry(0.26, 0.014, 12, 48));
    const emblem = new THREE.Group();
    emblem.add(new THREE.Mesh(shieldExtrude, bodyMat));        // raised glass crest
    emblem.add(new THREE.LineLoop(shieldGeo, emblemMat));      // faint glowing rim (pulses on unlock)
    const scanBarMat = track(new THREE.MeshBasicMaterial({ color: 0x9fe6ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, toneMapped: false, opacity: 0 }));
    const scanBarGeo = track(new THREE.PlaneGeometry(0.46, 0.03));
    const pad = new THREE.Mesh(padGeo, padMat); pad.position.set(0, -0.06, 0.07);
    const fp = new THREE.Mesh(fpGeo, fpMat); fp.position.set(0, -0.06, 0.1); fp.renderOrder = 20;
    const bezel = new THREE.Mesh(bezelGeo, bezelMat); bezel.position.set(0, -0.06, 0.095); bezel.renderOrder = 20;
    const scanBar = new THREE.Mesh(scanBarGeo, scanBarMat); scanBar.position.set(0, -0.06, 0.11); scanBar.renderOrder = 21;
    emblem.add(pad, fp, bezel, scanBar);
    emblem.scale.setScalar(0.82); emblem.position.set(0, -0.02, BODY_D / 2 + 0.0); lock.add(emblem);

    // ── Shackle (smooth glass) ──
    const LEG_SPACING = 0.92, ARC_R = LEG_SPACING / 2, TUBE = 0.135, LEG_LEN = 0.72;
    const shackle = new THREE.Group();
    const legGeo = track(new THREE.CylinderGeometry(TUBE, TUBE, LEG_LEN, lowPerf ? 16 : 32));
    const rightLeg = new THREE.Mesh(legGeo, shackleMat); rightLeg.position.set(0, LEG_LEN / 2, 0);
    const leftLeg = new THREE.Mesh(legGeo, shackleMat); leftLeg.position.set(-LEG_SPACING, LEG_LEN / 2, 0);
    const arcGeo = track(new THREE.TorusGeometry(ARC_R, TUBE, lowPerf ? 14 : 24, lowPerf ? 28 : 48, Math.PI));
    const arc = new THREE.Mesh(arcGeo, shackleMat); arc.position.set(-ARC_R, LEG_LEN, 0);
    shackle.add(rightLeg, leftLeg, arc); shackle.position.set(LEG_SPACING / 2, BODY_H / 2 - 0.34, 0); lock.add(shackle);

    // ── Soft ambient depth glow behind the lock ──
    const haloC = document.createElement('canvas'); haloC.width = haloC.height = 256;
    const hx = haloC.getContext('2d')!;
    const hg = hx.createRadialGradient(128, 128, 0, 128, 128, 128);
    hg.addColorStop(0, 'rgba(70,140,230,0.5)'); hg.addColorStop(0.5, 'rgba(40,90,180,0.18)'); hg.addColorStop(1, 'rgba(0,0,0,0)');
    hx.fillStyle = hg; hx.fillRect(0, 0, 256, 256);
    const haloTex = track(new THREE.CanvasTexture(haloC));
    const haloMat = track(new THREE.SpriteMaterial({ map: haloTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.6 }));
    const halo = new THREE.Sprite(haloMat); halo.scale.set(5, 5, 1); halo.position.z = -1.2; lock.add(halo);

    // ── Spatial starfield background (swirling 3D cyan/blue/purple dust cloud) ──
    const starGroup = new THREE.Group();
    
    const particleCount = lowPerf ? 800 : 2500;
    const particleSpread = 54;
    const dustGeometry = track(new THREE.BufferGeometry());
    const dustVertices = [];
    const dustColors = [];

    const starColors = [
      new THREE.Color(0x00d4ff), // Cyan
      new THREE.Color(0x4a8ad6), // Electric blue
      new THREE.Color(0x7c3aed), // Violet/purple
    ];

    for (let i = 0; i < particleCount; i++) {
      let x, y, z;
      // 40% of particles are focused in the foreground closer to the camera (depth z: -5 to 6.0)
      // to create a rich, immersive 3D depth effect of particles floating right in front of the screen
      if (Math.random() < 0.40) {
        x = (Math.random() - 0.5) * 36;
        y = (Math.random() - 0.5) * 36;
        z = -5 + Math.random() * 11.0;
      } else {
        x = (Math.random() - 0.5) * particleSpread;
        y = (Math.random() - 0.5) * particleSpread;
        z = (Math.random() - 0.5) * particleSpread;
      }
      dustVertices.push(x, y, z);

      const col = starColors[Math.floor(Math.random() * starColors.length)];
      dustColors.push(col.r, col.g, col.b);
    }

    dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustVertices, 3));
    dustGeometry.setAttribute('color', new THREE.Float32BufferAttribute(dustColors, 3));

    const dustMaterial = track(new THREE.PointsMaterial({
      size: lowPerf ? 0.14 : 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      toneMapped: false
    }));

    const starDust = new THREE.Points(dustGeometry, dustMaterial);
    starDust.position.z = -5;
    starGroup.add(starDust);
    scene.add(starGroup);

    const rig = new THREE.Group(); rig.add(lock); scene.add(rig);
    const applyScale = () => {
      const w = window.innerWidth;
      const s = w < 768 ? 0.38 : w < 1200 ? 0.72 : 0.92;
      lock.scale.setScalar(s);
      rig.position.x = w < 768 ? 0 : w < 1200 ? 1.75 : 2.3;
    };
    applyScale();

    // ── Bloom ──
    let composer: EffectComposer | null = null;
    let bloomPass: UnrealBloomPass | null = null;
    let gradePass: ShaderPass | null = null;
    if (useBloom) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.7, 0.88);
      composer.addPass(bloomPass);
      // photographic grade: faint chromatic aberration + film grain → reads like a real photo
      gradePass = new ShaderPass({
        uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uAb: { value: 0.0009 }, uGrain: { value: 0.012 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime,uAb,uGrain; varying vec2 vUv;
          float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}
          void main(){ vec2 d=vUv-0.5;
            float r=texture2D(tDiffuse,vUv-d*uAb).r, g=texture2D(tDiffuse,vUv).g, b=texture2D(tDiffuse,vUv+d*uAb).b;
            vec3 col=vec3(r,g,b); col+=(rand(vUv+fract(uTime))-0.5)*uGrain;
            gl_FragColor=vec4(col,1.0); }`,
      });
      composer.addPass(gradePass);
      composer.setPixelRatio(dpr);
      composer.setSize(window.innerWidth, window.innerHeight);
    }

    const st = {
      scrollY: window.scrollY,
      vel: 0,
      lastScroll: window.scrollY,
      mx: 0,
      my: 0,
      tmx: 0,
      tmy: 0,
      prog: 0,
      time: 0,
      starScrollY: window.scrollY,
    };

    function update(dt: number) {
      st.mx = lerp(st.mx, st.tmx, 0.2); st.my = lerp(st.my, st.tmy, 0.2);
      const rawVel = st.scrollY - st.lastScroll; st.lastScroll = st.scrollY;
      st.vel = lerp(st.vel, rawVel, 0.12);
      const speed = clamp(Math.abs(st.vel) / 40, 0, 1);
      const raw = clamp(st.scrollY / 360, 0, 1); // 0..1 across the 360px scroll
      // ONE smooth, scroll-linked driver: responsive but glides (no hard cap = no lag).
      st.prog = lerp(st.prog, raw, 0.08);
      const p = st.prog;
      const BASE_YAW = -0.34;

      // The lock HOLDS unlocked while the hero is pinned, then moves up 1:1 WITH the
      // page scroll once the pin releases — lock + page scroll away as ONE flow.
      const vH = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
      const exitPx = Math.max(0, st.scrollY - 360);
      const isMobile = window.innerWidth < 768;
      const baseY = isMobile ? 0.8 : -0.6;
      rig.position.y = baseY + exitPx * (vH / window.innerHeight);
      rig.position.z = 0; rig.scale.setScalar(1);
      rig.visible = rig.position.y < 4.5;

      // Phase 1 — spin 360°
      const spin = smoothstep(0.0, 0.28, p);
      lock.rotation.y = BASE_YAW + spin * Math.PI * 2 + st.mx * 0.28;
      lock.rotation.x = 0.1 + st.my * 0.18 + Math.sin(st.time * 0.5) * 0.025;

      // Phase 2 — fingerprint scan (a bar sweeps the sensor, the print lights up)
      const scan = smoothstep(0.28, 0.52, p);
      const scanWin = smoothstep(0.28, 0.36, p) * (1 - smoothstep(0.46, 0.54, p));
      scanBar.position.y = -0.06 + lerp(0.22, -0.22, scan);
      scanBarMat.opacity = 0.8 * scanWin;
      const fpLit = smoothstep(0.3, 0.5, p);

      // Phase 3 — authenticate (cyan→green) + unlock (shackle opens)
      const auth = smoothstep(0.52, 0.74, p);
      const open = smoothstep(0.54, 0.8, p);
      shackle.rotation.z = -open * 0.72;
      shackle.position.y = (BODY_H / 2 - 0.34) + open * 0.14;

      // Material opacities track the animation phases (cage + emblem + scanner
      // brighten as the lock energises and unlocks).
      const fpPulse = 0.6 + 0.4 * Math.sin(st.time * 3.0);
      const energy = 0.4 + 0.6 * open;
      lineMat.opacity = clamp(0.1 + 0.26 * energy, 0, 1);
      emblemMat.opacity = clamp(0.4 + 0.4 * open, 0, 1);
      (rimMat.uniforms.uIntensity as { value: number }).value = 0.45 + speed * 0.5 + open * 0.6;
      haloMat.opacity = 0.5;
      fpMat.opacity = clamp(0.3 + 0.5 * fpLit * fpPulse, 0, 1);
      fpMat.color.setRGB(lerp(0.62, 0.25, auth), lerp(0.9, 1.0, auth), lerp(1.0, 0.5, auth));
      bezelMat.opacity = clamp(0.35 + 0.4 * fpLit, 0, 1); bezelMat.color.copy(fpMat.color);
      scanBarMat.color.copy(fpMat.color);

      // Starfield parallax: mouse drift + smooth scroll offset
      st.starScrollY = lerp(st.starScrollY, st.scrollY, 0.08);
      const starOffset = st.starScrollY * (isMobile ? 0.005 : 0.003);
      starGroup.position.x = -st.mx * 0.5;
      starGroup.position.y = -st.my * 0.4 + starOffset;
      starDust.rotation.y = st.time * 0.08;

      if (gradePass) (gradePass.uniforms.uTime as { value: number }).value = st.time;
      if (bloomPass) bloomPass.strength = 0.42 + speed * 0.4 + open * 0.2;
      camera.position.z = lerp(camera.position.z, 6.6 - speed * 0.5, 0.1);
      st.time += dt;
    }

    function renderFrame() { if (composer) composer.render(); else renderer.render(scene, camera); }

    let raf = 0, last = 0;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      update(dt); renderFrame();
      raf = requestAnimationFrame(loop);
    };
    const drawStatic = () => {
      st.scrollY = window.scrollY; st.vel = 0;
      st.prog = clamp(st.scrollY / 360, 0, 1);
      st.starScrollY = window.scrollY;
      update(0); renderFrame();
    };

    const onScroll = () => { st.scrollY = window.scrollY; };
    const onScrollStatic = () => { st.scrollY = window.scrollY; cancelAnimationFrame(raf); raf = requestAnimationFrame(drawStatic); };
    const onMouse = (e: MouseEvent) => {
      st.tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      st.tmy = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      composer?.setSize(window.innerWidth, window.innerHeight);
      bloomPass?.setSize(window.innerWidth, window.innerHeight);
      applyScale();
      if (prefersReduced) drawStatic();
    };

    window.addEventListener('resize', onResize, { passive: true });
    if (prefersReduced) {
      drawStatic();
      window.addEventListener('scroll', onScrollStatic, { passive: true });
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('mousemove', onMouse, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScrollStatic);
      window.removeEventListener('mousemove', onMouse);
      disposables.forEach((d) => d.dispose());
      envRT?.dispose();
      pmrem.dispose();
      bloomPass?.dispose();
      composer?.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="unlockd-webgl-canvas"
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', willChange: 'transform',
        transform: 'translateZ(0)', backfaceVisibility: 'hidden',
      }}
      aria-hidden
    />
  );
}
