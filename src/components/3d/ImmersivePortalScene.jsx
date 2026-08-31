import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useIsMobile';

const kineticWords = [
  { word: "CREATE", pos: [-3, 1.8, -1], mobilePos: [-1.4, 1.6, -1], color: "#00FF66" },
  { word: "DESIGN", pos: [3.2, 1.2, -2], mobilePos: [1.4, 1.2, -1.5], color: "#FFFFFF" },
  { word: "CODE", pos: [-2.8, -1.4, -1.5], mobilePos: [-1.3, -1.4, -1.2], color: "#00FF66" },
  { word: "BUILD", pos: [2.9, -1.6, -0.8], mobilePos: [1.3, -1.5, -0.8], color: "#00CC55" },
  { word: "EXPERIMENT", pos: [0, 2.5, -2.5], mobilePos: [0, 2.2, -2.0], color: "#00FF66" },
  { word: "LEARN", pos: [0, -2.4, -2.2], mobilePos: [0, -2.2, -1.8], color: "#FFFFFF" }
];

function EnergyTunnelParticles({ count = 280 }) {
  const points = useRef();

  const [positions, speedData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speeds = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 4.0;
      const z = (Math.random() - 0.5) * 20;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = z;
      speeds.push(0.04 + Math.random() * 0.08);
    }
    return [pos, speeds];
  }, [count]);

  useFrame(() => {
    if (!points.current) return;
    const array = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const zIdx = i * 3 + 2;
      array[zIdx] += speedData[i];
      if (array[zIdx] > 10) {
        array[zIdx] = -10;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.z += 0.002;
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
        size={0.075}
        color="#00FF66"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MorphingPortalNode({ isMobile }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.6;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Outer Torus Knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[isMobile ? 0.85 : 1.1, isMobile ? 0.22 : 0.28, 80, 16]} />
        <meshStandardMaterial
          color="#050505"
          emissive="#00FF66"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Inner Energy Core */}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.45 : 0.6, 20, 20]} />
        <meshStandardMaterial
          color="#00FF66"
          emissive="#00FF66"
          emissiveIntensity={2.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function ImmersivePortalScene() {
  const { isMobile, isTouchDevice } = useIsMobile();

  return (
    <div
      className="w-full h-full relative flex items-center justify-center"
      style={{ minHeight: isMobile ? '380px' : '580px' }}
      data-3d="true"
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 8.5 : 6.5], fov: isMobile ? 55 : 50 }}
        gl={{ antialias: !isMobile, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 5]} intensity={2.5} color="#00FF66" />
        <pointLight position={[5, 5, 2]} intensity={1} color="#FFFFFF" />

        <EnergyTunnelParticles count={isMobile ? 120 : 320} />
        <MorphingPortalNode isMobile={isMobile} />

        {/* Floating Kinetic 3D Words */}
        {kineticWords.map((item) => (
          <Float key={item.word} speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
            <group position={isMobile ? item.mobilePos : item.pos}>
              <Html center distanceFactor={isMobile ? 10 : 8}>
                <div className="select-none pointer-events-none px-2.5 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-[#00FF66]/40 shadow-[0_0_20px_rgba(0,255,102,0.3)]">
                  <span
                    className="text-[10px] sm:text-sm font-mono font-bold tracking-widest uppercase"
                    style={{ color: item.color }}
                  >
                    {item.word}
                  </span>
                </div>
              </Html>
            </group>
          </Float>
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.8}
          rotateSpeed={isTouchDevice ? 0.4 : 0.6}
        />
      </Canvas>
    </div>
  );
}
