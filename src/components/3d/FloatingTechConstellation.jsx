import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { techStackData } from '../../data/techStack';
import { useIsMobile } from '../../hooks/useIsMobile';

// Central AI Core Node in Constellation
function CentralConstellationCore({ isMobile }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.z = t * 0.2;
      const s = 1 + Math.sin(t * 2) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[isMobile ? 0.65 : 0.85, 0]} />
        <meshStandardMaterial
          color="#0A0A0A"
          emissive="#00FF66"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[isMobile ? 0.35 : 0.5, 16, 16]} />
        <meshBasicMaterial color="#00FF66" />
      </mesh>
      <Html center distanceFactor={isMobile ? 12 : 8}>
        <div className="pointer-events-none select-none px-2 py-0.5 rounded bg-black/90 border border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.4)] text-[9px] font-mono font-bold text-[#00FF66] whitespace-nowrap">
          AI CORE
        </div>
      </Html>
    </group>
  );
}

// Single Orbiting Technology Node
function TechConstellationNode({ tech, onHover, hoveredTech, isMobile }) {
  const nodeRef = useRef();
  const isHovered = hoveredTech?.name === tech.name;
  const radiusMultiplier = isMobile ? 0.75 : 1.0;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const currentAngle = tech.phase + t * tech.orbitSpeed * 0.3;
    const x = Math.cos(currentAngle) * (tech.orbitRadius * radiusMultiplier);
    const z = Math.sin(currentAngle) * (tech.orbitRadius * radiusMultiplier);
    const y = Math.sin(currentAngle * 2 + tech.phase) * (isMobile ? 0.5 : 0.8);

    if (nodeRef.current) {
      nodeRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={nodeRef}>
      {/* Node Sphere */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(tech);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onHover(tech);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[isMobile ? 0.16 : 0.22, 16, 16]} />
        <meshStandardMaterial
          color={tech.color || '#00FF66'}
          emissive={tech.color || '#00FF66'}
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbit Trail Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[tech.orbitRadius * radiusMultiplier - 0.005, tech.orbitRadius * radiusMultiplier + 0.005, 48]} />
        <meshBasicMaterial
          color={tech.color || '#00FF66'}
          transparent
          opacity={isHovered ? 0.4 : 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3D Label Tag */}
      <Html center distanceFactor={isMobile ? 12 : 9} position={[0, isMobile ? 0.3 : 0.4, 0]}>
        <div
          onClick={() => onHover(tech)}
          className={`select-none cursor-pointer transition-all duration-300 transform-gpu ${
            isHovered ? 'scale-125 z-50' : 'scale-95 opacity-85'
          }`}
        >
          <div
            className={`px-2 py-0.5 rounded-full backdrop-blur-md border text-[9px] sm:text-[10px] font-mono font-bold tracking-wider flex items-center gap-1 shadow-lg whitespace-nowrap ${
              isHovered
                ? 'bg-black/95 text-[#00FF66] border-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.6)]'
                : 'bg-black/75 text-white/90 border-white/10 hover:border-[#00FF66]/50'
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: tech.color || '#00FF66' }}
            />
            {tech.name}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Synaptic Connecting Web Lines
function ConstellationLines({ isMobile }) {
  const linePoints = useMemo(() => {
    const points = [];
    const radiusMultiplier = isMobile ? 0.75 : 1.0;
    for (let i = 0; i < techStackData.length; i++) {
      const t1 = techStackData[i];
      const p1 = [
        Math.cos(t1.phase) * (t1.orbitRadius * radiusMultiplier),
        0,
        Math.sin(t1.phase) * (t1.orbitRadius * radiusMultiplier)
      ];
      points.push([[0, 0, 0], p1]);
    }
    return points;
  }, [isMobile]);

  return (
    <group>
      {linePoints.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#00FF66"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
      {/* Outer Orbit Guides */}
      {[2.2, 3.4, 4.6].map((radius, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * (isMobile ? 0.75 : 1.0), radius * (isMobile ? 0.75 : 1.0) + 0.008, 64]} />
          <meshBasicMaterial color="#00FF66" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function FloatingTechConstellation() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const { isMobile, isTouchDevice } = useIsMobile();

  return (
    <div
      className="w-full h-full relative flex items-center justify-center"
      style={{ minHeight: isMobile ? '320px' : '480px' }}
      data-3d="true"
    >
      <Canvas
        camera={{ position: [0, isMobile ? 4 : 3, isMobile ? 10.5 : 8], fov: isMobile ? 54 : 48 }}
        gl={{ antialias: !isMobile, alpha: true }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 6]} intensity={1.5} color="#00FF66" />
        <pointLight position={[-6, -6, -6]} intensity={1} color="#FFFFFF" />

        <CentralConstellationCore isMobile={isMobile} />
        <ConstellationLines isMobile={isMobile} />

        {techStackData.map((tech) => (
          <TechConstellationNode
            key={tech.name}
            tech={tech}
            hoveredTech={hoveredTech}
            onHover={setHoveredTech}
            isMobile={isMobile}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.2}
          rotateSpeed={isTouchDevice ? 0.5 : 0.6}
          touches={{
            ONE: 2, // Rotate
            TWO: 0, // No pinch pan
          }}
        />
      </Canvas>

      {/* Selected Tech Card HUD */}
      {hoveredTech && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 w-auto max-w-[90%]">
          <div className="px-3.5 py-1.5 rounded-xl bg-black/95 backdrop-blur-md border border-[#00FF66]/60 shadow-[0_0_25px_rgba(0,255,102,0.3)] flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
              style={{ backgroundColor: hoveredTech.color || '#00FF66' }}
            />
            <div className="min-w-0">
              <p className="text-xs font-mono font-bold text-[#00FF66] truncate">
                {hoveredTech.name} &bull; {hoveredTech.category}
              </p>
              <p className="text-[10px] text-white/80 truncate">{hoveredTech.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
