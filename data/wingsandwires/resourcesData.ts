import { Cpu, Monitor, Code } from 'lucide-react';

export const droneResources = [
  {
    name: 'Basic Components',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    items: [
      {
        id: 1,
        title: 'Brushless Motors (BLDCs)',
        description: 'These are the engines of your drone. They spin the propellers — smooth, efficient, and powerful. Controlled by ESCs for speed and direction.',
        logo: "/wingsandwires/BrushLessMotor.png",
        website: "https://en.wikipedia.org/wiki/Brushless_DC_electric_motor",
        linkedinUrl: ""
      },
      {
        id: 2,
        title: 'Electronic Speed Controllers (ESCs)',
        description: 'Connects your flight controller to the motors. Translates control signals into power, managing each motor\'s speed precisely.',
        logo: "/wingsandwires/ESC.png",
        website: "https://en.wikipedia.org/wiki/Electronic_speed_control",
        linkedinUrl: ""
      },
      {
        id: 3,
        title: 'Drone Frame',
        description: 'The skeleton of your drone — holds everything together. Usually made of lightweight materials like carbon fiber or plastic.',
        logo: "/wingsandwires/Drone_Frame.png",
        website: "https://www.droneybee.com/drone-frame-basics/",
        linkedinUrl: ""
      },
      {
        id: 4,
        title: 'LiPo Battery (Lithium Polymer)',
        description: 'The power source for your drone. High energy density = longer flight time. Handle carefully — can catch fire if overcharged.',
        logo: "/wingsandwires/Lipo.png",
        website: "https://en.wikipedia.org/wiki/Lithium_polymer_battery",
        linkedinUrl: ""
      },
      {
        id: 5,
        title: 'Flight Controller (FC)',
        description: 'The brain of the drone. Receives control signals, processes IMU data, and stabilizes flight by sending commands to ESCs.',
        logo: "/wingsandwires/FC.png",
        website: "https://oscarliang.com/flight-controller/",
        linkedinUrl: ""
      },
      {
        id: 6,
        title: 'Inertial Measurement Unit (IMU)',
        description: 'Tracks orientation and motion using gyroscope, accelerometer, and magnetometer. Helps the FC keep your drone stable.',
        logo: "/wingsandwires/IMU.png",
        website: "https://en.wikipedia.org/wiki/Inertial_measurement_unit",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'Simulation Software',
    icon: Monitor,
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    items: [
      {
        id: 7,
        title: 'Gazebo (Simulator)',
        description: 'Open-source 3D simulator for drones and robots. Works great with ROS — ideal for testing drone physics and sensors safely.',
        logo: "/wingsandwires/Gazebo.png",
        website: "https://gazebosim.org/home",
        linkedinUrl: ""
      },
      {
        id: 8,
        title: 'NVIDIA Isaac Sim',
        description: 'Advanced GPU-accelerated simulator for AI robotics. Great for high-end research, but heavy setup — Gazebo is easier for starters.',
        logo: "/wingsandwires/NVIDIA-Isaac-Sim.png",
        website: "https://developer.nvidia.com/isaac-sim",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'Drone Control Software',
    icon: Code,
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'rgba(147, 51, 234, 0.4)',
    items: [
      {
        id: 9,
        title: 'INAV (Firmware)',
        description: 'Beginner-friendly drone firmware. Simple configuration, great GPS support, and solid stability for multirotors and fixed wings.',
        logo: "/wingsandwires/INAV.png",
        website: "https://github.com/iNavFlight/inav",
        linkedinUrl: ""
      },
      {
        id: 10,
        title: 'ArduPilot',
        description: 'Powerful open-source flight software for professional drones. Supports planes, rovers, and subs. Complex but super capable.',
        logo: "/wingsandwires/ArduPilot.png",
        website: "https://ardupilot.org/",
        linkedinUrl: ""
      },
      {
        id: 11,
        title: 'Betaflight',
        description: 'Popular firmware for FPV and racing drones. Focused on agility and performance, not ideal for autonomous beginners.',
        logo: "/wingsandwires/Betaflight.png",
        website: "https://betaflight.com/",
        linkedinUrl: ""
      }
    ]
  }
];