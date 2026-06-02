'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// Import post-processing modules for the glow effect
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return isMobile;
};

export const ToxicBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // --- 1. SETUP POST-PROCESSING FOR GLOW EFFECT ---
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.7, // strength
        0.1, // radius
        0.1  // threshold
    );
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);


    // --- Create a Pivot for the entire system (Saturn + Dust) ---
    const systemPivot = new THREE.Group();
    const axialTilt = 26.7 * (Math.PI / 180);
    systemPivot.rotation.z = axialTilt;
    scene.add(systemPivot);

    // Removed Saturn and its rings

    camera.position.z = 12;

    // --- 2. CREATE THE TOXIC SMOKE AND ADD IT TO THE SYSTEM PIVOT ---
    const dustColor = "#22c55e"; // Toxic green
    const dustGeometry = new THREE.BufferGeometry();
    const dustVertices = [];
    const color1 = new THREE.Color(dustColor);

    const particleCount = isMobile ? 1000 : 2000;
    const particleSpread = 50; // Spread the dust out further

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * particleSpread;
        const y = (Math.random() - 0.5) * particleSpread;
        const z = (Math.random() - 0.5) * particleSpread;
        dustVertices.push(x, y, z);
    }
    
    dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustVertices, 3));

    const dustMaterial = new THREE.PointsMaterial({
        size: isMobile ? 0.15 : 0.2, // Made particles bigger
        color: color1,
        transparent: true,
        opacity: 0.7
    });

    const starDust = new THREE.Points(dustGeometry, dustMaterial);
    starDust.position.z = -5; // Place it slightly behind the planet
    systemPivot.add(starDust); // Add it to the main pivot to make it orbit

    // --- Event Listeners ---
    const handleMouseMove = (event: MouseEvent) => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const handleScroll = () => { scroll.current = window.scrollY; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // --- Single Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // --- Animate the background toxic smoke ---
        // Made rotation faster
        starDust.rotation.y = elapsedTime * 0.08;

        // --- Animate the entire system (Saturn + Dust) based on scroll and mouse ---
        const startPosition = new THREE.Vector3(isMobile ? 0 : 7, isMobile ? 2 : 0, 0);
        const endPosition = new THREE.Vector3(isMobile ? 0 : 7, isMobile ? 20 : 15, 0);
        const progress = Math.min(scroll.current / 1000, 1.0);
        const basePosition = new THREE.Vector3().lerpVectors(startPosition, endPosition, progress);
        
        // 3. The mouse offset ONLY applies to the main system pivot
        const mouseOffsetX = mouse.current.x * 1.5;
        const mouseOffsetY = mouse.current.y * 1.5;
        const targetX = basePosition.x + mouseOffsetX;
        const targetY = basePosition.y + mouseOffsetY;

        systemPivot.position.x += (targetX - systemPivot.position.x) * 0.05;
        systemPivot.position.y += (targetY - systemPivot.position.y) * 0.05;
        
        // Use the composer to render the scene with the glow effect
        composer.render();
        animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    
    const handleResize = () => {
        if (currentMount) {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            composer.setSize(currentMount.clientWidth, currentMount.clientHeight); // Resize composer
        }
    };
    window.addEventListener('resize', handleResize);
    
    // --- Cleanup Function ---
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        if (currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
        
        dustGeometry.dispose();
        dustMaterial.dispose();
    };
  }, [isMobile]);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none" 
    />
  );
};

