import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { Mesh, Group, Points as PointsType } from 'three';

// Post-processing is disabled as '@react-three/postprocessing' is not installed.
// The EffectsWrapper component will render nothing.
const EffectsWrapper: React.FC = () => null;

const RotatingQ = (props: ThreeElements['mesh']) => {
  const ref = useRef<Mesh>(null!);
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#ff8c00" emissive="#ff8c00" emissiveIntensity={2} wireframe />
    </mesh>
  );
};

export const CyberpunkLogo: React.FC = () => {
  return (
    <div className="w-16 h-16 md:w-20 md:h-20 cursor-pointer">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} color="#ffd700" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#ff8c00" intensity={2} />
        <Suspense fallback={null}>
          <RotatingQ />
          <EffectsWrapper />
        </Suspense>
      </Canvas>
    </div>
  );
};

const Stars = () => {
  const ref = useRef<PointsType>(null!);

  const positions = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Random point in a spherical shell
        const r = 4 + Math.random() * 6; // radius between 4 and 10
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
        ref.current.rotation.y += delta * 0.03;
        ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff8c00"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};


export const CyberpunkBox: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
       <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
         <Suspense fallback={null}>
           <Stars />
         </Suspense>
       </Canvas>
    </div>
  );
};

const Spaceship = (props: ThreeElements['group']) => {
  const groupRef = useRef<Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Bobbing motion
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
      // Rotation
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef} {...props} rotation={[Math.PI / 8, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Cockpit */}
      <mesh position={[0, 0.2, 0.35]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff8c00" emissive="#ff8c00" emissiveIntensity={3} toneMapped={false} />
      </mesh>
       {/* Wings */}
       <mesh position={[-0.6, -0.2, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <boxGeometry args={[0.7, 0.08, 0.3]} />
        <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.6, -0.2, 0]} rotation={[0, 0, Math.PI / 12]}>
        <boxGeometry args={[0.7, 0.08, 0.3]} />
        <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.2} />
      </mesh>
       {/* Engine Glow */}
       <mesh position={[0, -0.6, 0]}>
         <cylinderGeometry args={[0.15, 0.1, 0.1, 16]} />
         <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={4} toneMapped={false} />
       </mesh>
    </group>
  );
};

export const AnimatedSpaceship: React.FC = () => {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32">
      <Canvas camera={{ position: [0, 0.5, 3], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -10]} color="#ff8c00" intensity={5} />
        <Suspense fallback={null}>
          <Spaceship />
        </Suspense>
      </Canvas>
    </div>
  );
};
