import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.8}
        wireframe
        emissive="#3b82f6"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingOrb />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

interface Hero3DProps {
  className?: string;
}

export default function Hero3D({ className = "" }: Hero3DProps) {
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setWebGLAvailable(!!gl);
  }, []);

  if (!webGLAvailable) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-32 h-32 rounded-full gradient-system animate-pulse">
          <div className="w-full h-full rounded-full border-2 border-primary/50 border-dashed animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-64 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
