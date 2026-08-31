import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { heroFloatingBadges } from '../../data/skills';
import { useIsMobile } from '../../hooks/useIsMobile';

// Synaptic Particle Cloud
function SynapticParticles({ count = 120, hoverLevel = 0 }) {
  const points = useRef();

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initialPos = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.2 + Math.random() * 1.8;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      initialPos.push({ x, y, z, speed: 0.2 + Math.random() * 0.5 });
    }
    return [pos, initialPos];
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    const posArray = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const init = initialPositions[i];
      posArray[idx] = init.x + Math.sin(time * init.speed + i) * (0.2 + hoverLevel * 0.2);
      posArray[idx + 1] = init.y + Math.cos(time * init.speed + i) * (0.2 + hoverLevel * 0.2);
      posArray[idx + 2] = init.z + Math.sin(time * 0.5 + i) * 0.15;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = time * 0.08;
    points.current.rotation.x = time * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#00FF66"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Inner Pulsing Electric Core
function CoreEnergySphere({ isHovered }) {
  const meshRef = useRef();
  const boxRef = useRef();
  const edgeRef1 = useRef();
  const edgeRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Sphere pulse
    if (meshRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * 0.08 + (isHovered ? 0.15 : 0);
      meshRef.current.scale.set(pulse, pulse, pulse);
    }

    // Box slow rotation — different axis to sphere for contrast
    if (boxRef.current) {
      boxRef.current.rotation.y = t * 0.35;
      boxRef.current.rotation.x = t * 0.18;
      boxRef.current.rotation.z = t * 0.10;
    }

    // Edge ring rotations (counter-spin)
    if (edgeRef1.current) {
      edgeRef1.current.rotation.y = -t * 0.5;
      edgeRef1.current.rotation.x = Math.sin(t * 0.4) * 0.4;
    }
    if (edgeRef2.current) {
      edgeRef2.current.rotation.z = t * 0.45;
      edgeRef2.current.rotation.y = Math.cos(t * 0.3) * 0.3;
    }
  });

  return (
    <group>
      {/* ── Core Sphere ──────────────────────── */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshStandardMaterial
          color="#00FF66"
          emissive="#00FF66"
          emissiveIntensity={isHovered ? 2.5 : 1.4}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* ── Outer glow wireframe shell ────────── */}
      <mesh>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial
          color="#00FF66"
          transparent
          opacity={isHovered ? 0.25 : 0.12}
          wireframe
        />
      </mesh>

      {/* ── 3D Wireframe Box Border ───────────── */}
      <mesh ref={boxRef}>
        <boxGeometry args={[2.1, 2.1, 2.1]} />
        <meshBasicMaterial
          color="#00FF66"
          transparent
          opacity={isHovered ? 0.55 : 0.32}
          wireframe
        />
      </mesh>

      {/* ── Diagonal Accent Edge Ring 1 ───────── */}
      <mesh ref={edgeRef1}>
        <torusGeometry args={[1.38, 0.012, 8, 32]} />
        <meshBasicMaterial
          color="#00FF66"
          transparent
          opacity={isHovered ? 0.75 : 0.45}
        />
      </mesh>

      {/* ── Diagonal Accent Edge Ring 2 ───────── */}
      <mesh ref={edgeRef2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.38, 0.009, 8, 32]} />
        <meshBasicMaterial
          color="#00CC55"
          transparent
          opacity={isHovered ? 0.55 : 0.30}
        />
      </mesh>

      {/* ── Corner Sparkle Points ─────────────── */}
      {[
        [1.05,  1.05,  1.05],
        [-1.05, 1.05,  1.05],
        [1.05, -1.05,  1.05],
        [1.05,  1.05, -1.05],
        [-1.05,-1.05,  1.05],
        [-1.05, 1.05, -1.05],
        [1.05, -1.05, -1.05],
        [-1.05,-1.05, -1.05],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshBasicMaterial color="#00FF66" />
        </mesh>
      ))}
    </group>
  );
}


// Outer Dark Metallic Polyhedron Shell
function MetallicNeuralCage({ isHovered }) {
  const cageRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speed = isHovered ? 0.6 : 0.25;
    
    if (cageRef.current) {
      cageRef.current.rotation.x = t * speed * 0.5;
      cageRef.current.rotation.y = t * speed;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = -t * speed * 0.8;
      ringRef1.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.5) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * speed * 0.7;
      ringRef2.current.rotation.z = Math.PI / 3;
    }
  });

  return (
    <group>
      {/* Outer Metallic Icosahedron Wireframe */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshStandardMaterial
          color="#0A0A0A"
          emissive="#00FF66"
          emissiveIntensity={isHovered ? 0.8 : 0.35}
          roughness={0.1}
          metalness={0.95}
          wireframe
        />
      </mesh>

      {/* Holographic Gyroscopic Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.25, 0.015, 16, 64]} />
        <meshBasicMaterial color="#00FF66" transparent opacity={0.65} />
      </mesh>

      <mesh ref={ringRef2}>
        <torusGeometry args={[2.5, 0.012, 16, 64]} />
        <meshBasicMaterial color="#00CC55" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

// ── Neural Core Outer Border Box ───────────────────────────────────────────
function NeuralCoreBorderBox({ isHovered }) {
  const outerBoxRef = useRef();
  const innerBoxRef = useRef();
  const panelH = useRef();
  const panelV = useRef();
  const panelD = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Very slow counter-rotation so it feels like a containment field drifting
    if (outerBoxRef.current) {
      outerBoxRef.current.rotation.y = t * 0.07;
      outerBoxRef.current.rotation.x = Math.sin(t * 0.11) * 0.12;
      outerBoxRef.current.rotation.z = Math.cos(t * 0.09) * 0.08;
    }
    // Inner box counter-rotates for depth
    if (innerBoxRef.current) {
      innerBoxRef.current.rotation.y = -t * 0.12;
      innerBoxRef.current.rotation.x = Math.cos(t * 0.13) * 0.10;
    }
    // Cross-plane panels pulse opacity
    const pulse = 0.18 + Math.sin(t * 1.5) * 0.08;
    if (panelH.current) panelH.current.material.opacity = pulse;
    if (panelV.current) panelV.current.material.opacity = pulse * 0.8;
    if (panelD.current) panelD.current.material.opacity = pulse * 0.6;
  });

  const SIZE = 4.2;       // outer box half-extent
  const INNER = 3.85;     // inner inset box
  const CORNER_R = 0.09;  // corner sphere radius

  // All 8 corners of the box
  const corners = [
    [ SIZE/2,  SIZE/2,  SIZE/2],
    [-SIZE/2,  SIZE/2,  SIZE/2],
    [ SIZE/2, -SIZE/2,  SIZE/2],
    [ SIZE/2,  SIZE/2, -SIZE/2],
    [-SIZE/2, -SIZE/2,  SIZE/2],
    [-SIZE/2,  SIZE/2, -SIZE/2],
    [ SIZE/2, -SIZE/2, -SIZE/2],
    [-SIZE/2, -SIZE/2, -SIZE/2],
  ];

  return (
    <group>
      {/* ── Outer Wireframe Box ─────────────────── */}
      <mesh ref={outerBoxRef}>
        <boxGeometry args={[SIZE, SIZE, SIZE]} />
        <meshBasicMaterial
          color="#00FF66"
          transparent
          opacity={isHovered ? 0.45 : 0.22}
          wireframe
        />
      </mesh>

      {/* ── Inner Inset Wireframe Box ────────────── */}
      <mesh ref={innerBoxRef}>
        <boxGeometry args={[INNER, INNER, INNER]} />
        <meshBasicMaterial
          color="#00CC55"
          transparent
          opacity={isHovered ? 0.28 : 0.12}
          wireframe
        />
      </mesh>

      {/* ── Horizontal Cross-section Panel ──────── */}
      <mesh ref={panelH} rotation={[0, 0, 0]}>
        <planeGeometry args={[SIZE * 0.95, SIZE * 0.95]} />
        <meshBasicMaterial
          color="#00FF66"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>

      {/* ── Vertical Cross-section Panel ─────────── */}
      <mesh ref={panelV} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[SIZE * 0.95, SIZE * 0.95]} />
        <meshBasicMaterial
          color="#00FF66"
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>

      {/* ── Diagonal Cross-section Panel ─────────── */}
      <mesh ref={panelD} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[SIZE * 0.95, SIZE * 0.95]} />
        <meshBasicMaterial
          color="#00CC55"
          transparent
          opacity={0.10}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>

      {/* ── 8 Corner Node Spheres ────────────────── */}
      {corners.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[CORNER_R, 10, 10]} />
          <meshStandardMaterial
            color="#00FF66"
            emissive="#00FF66"
            emissiveIntensity={isHovered ? 3 : 1.6}
            roughness={0}
            metalness={1}
          />
        </mesh>
      ))}

      {/* ── Edge mid-point accent dots ────────────── */}
      {[
        [ SIZE/2, 0,      SIZE/2],
        [-SIZE/2, 0,      SIZE/2],
        [ SIZE/2, 0,     -SIZE/2],
        [-SIZE/2, 0,     -SIZE/2],
        [0,       SIZE/2, SIZE/2],
        [0,      -SIZE/2, SIZE/2],
        [0,       SIZE/2,-SIZE/2],
        [0,      -SIZE/2,-SIZE/2],
        [ SIZE/2, SIZE/2, 0],
        [-SIZE/2, SIZE/2, 0],
        [ SIZE/2,-SIZE/2, 0],
        [-SIZE/2,-SIZE/2, 0],
      ].map((pos, i) => (
        <mesh key={`mid-${i}`} position={pos}>
          <octahedronGeometry args={[0.055, 0]} />
          <meshBasicMaterial color="#00FF66" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}


// Floating 3D Badge Node
function FloatingBadgeItem({ text, position, rotationOffset }) {
  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <group position={position}>
        <Html center distanceFactor={10}>
          <div className="select-none pointer-events-none group transform-gpu transition-all duration-300">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#00FF66]/30 shadow-[0_0_15px_rgba(0,255,102,0.25)] hover:border-[#00FF66] transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-white whitespace-nowrap">
                {text}
              </span>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Main Interactive Scene
function CoreScene({ isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && !isMobile) {
      // Mouse tracking gyro — desktop only (touch handled by OrbitControls)
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  // Orbital badge positions — hidden on mobile to prevent overflow
  const badgePositions = useMemo(() => {
    if (isMobile) return [];
    return heroFloatingBadges.map((badge, idx) => {
      const angle = (idx / heroFloatingBadges.length) * Math.PI * 2;
      const radius = 3.2;
      const y = Math.sin(idx * 1.5) * 1.2;
      return {
        text: badge,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.7]
      };
    });
  }, [isMobile]);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <ambientLight intensity={isMobile ? 0.6 : 0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[-5, -5, -5]} intensity={2.5} color="#00FF66" />
      <pointLight position={[0, 0, 3]} intensity={1} color="#00CC55" />

      {/* Core components — fewer particles on mobile */}
      <CoreEnergySphere isHovered={isHovered} />
      <MetallicNeuralCage isHovered={isHovered} />
      <SynapticParticles count={isMobile ? 55 : 140} hoverLevel={isHovered ? 1 : 0} />

      {/* ── Outer Neural Core Border Box ─────── */}
      <NeuralCoreBorderBox isHovered={isHovered} />

      {/* Orbiting Badges — desktop only */}
      {badgePositions.map((b, i) => (
        <FloatingBadgeItem
          key={b.text}
          text={b.text}
          position={b.position}
          rotationOffset={i}
        />
      ))}
    </group>
  );
}

export default function NeuralCoreScene() {
  const { isMobile, isTouchDevice } = useIsMobile();

  return (
    <div
      className="w-full h-full relative flex items-center justify-center"
      style={{ minHeight: isMobile ? '320px' : '420px' }}
      data-3d="true"
    >
      {/* Background Cyber Glow */}
      <div className="absolute inset-0 pointer-events-none blur-3xl -z-10" style={{ background: 'radial-gradient(circle, rgba(0,255,102,0.1) 0%, transparent 70%)' }} />

      <Canvas
        camera={{ position: [0, 0, isMobile ? 9.5 : 7.2], fov: isMobile ? 52 : 45 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
        style={{ touchAction: 'none' }}
        className="w-full h-full"
      >
        <CoreScene isMobile={isMobile} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          zoomSpeed={isTouchDevice ? 1.0 : 0.7}
          minDistance={isMobile ? 5 : 3.5}
          maxDistance={isMobile ? 18 : 14}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={isTouchDevice ? 0.5 : 0.6}
          enableDamping={true}
          dampingFactor={0.08}
          touches={{
            ONE: 2, // TOUCH.ROTATE
            TWO: 1, // TOUCH.DOLLY_PAN
          }}
        />
      </Canvas>

      {/* Micro HUD Status Badge */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#00FF66]/20 text-[9px] sm:text-[10px] font-mono text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span>{isTouchDevice ? 'DRAG · PINCH TO ZOOM' : 'DRAG · SCROLL TO ZOOM'}</span>
        </div>
      </div>
    </div>
  );
}
