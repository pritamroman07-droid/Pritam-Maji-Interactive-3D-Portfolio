"use client";

import { Component, Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Sparkles, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = process.env.NEXT_PUBLIC_MODEL_URL;

/**
 * ─────────────────────────────────────────────────────────────
 * 3D MODEL PLACEHOLDER
 * Drop your photo-based 3D model (.glb) into /public/models and
 * set NEXT_PUBLIC_MODEL_URL=/models/your-model.glb in .env.local
 * The scene will automatically render it instead of the
 * abstract core below. See public/models/README.md.
 * ─────────────────────────────────────────────────────────────
 */

class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function HeroModel() {
  const { scene } = useGLTF(MODEL_URL as string);
  return (
    <primitive object={scene} scale={2.2} position={[0, -1.1, 0]} />
  );
}

function AbstractCore() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // mouse-follow rotation
    g.rotation.y += (state.pointer.x * 0.55 - g.rotation.y) * delta * 2.2;
    g.rotation.x += (state.pointer.y * -0.35 - g.rotation.x) * delta * 2.2;
    // slow self-rotation
    g.rotation.z += delta * 0.08;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh>
          <torusKnotGeometry args={[1.15, 0.34, 220, 32]} />
          <meshStandardMaterial
            color="#0c1220"
            metalness={0.95}
            roughness={0.18}
            emissive="#3b82f6"
            emissiveIntensity={0.22}
            wireframe={false}
          />
        </mesh>

        <mesh scale={1.65}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.14} />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.52, 48, 48]} />
          <meshStandardMaterial
            color="#0b0f1c"
            metalness={0.4}
            roughness={0.05}
            emissive="#7c3aed"
            emissiveIntensity={0.85}
          />
        </mesh>
      </Float>
    </group>
  );
}

function SceneRig() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useFrame((_, delta) => {
    if (typeof window === "undefined") return;
    const target = window.scrollY * 0.0009;
    scrollRef.current += (target - scrollRef.current) * delta * 2;
    camera.position.z = 7.2 + scrollRef.current * 1.4;
    camera.position.y = scrollRef.current * 0.6;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 4, 6]} intensity={90} color="#3b82f6" />
        <pointLight position={[-6, -3, 4]} intensity={60} color="#a855f7" />
        <directionalLight position={[0, 6, 4]} intensity={0.7} color="#ffffff" />

        <Suspense fallback={null}>
          <SceneRig />
          {MODEL_URL ? (
            <ModelBoundary fallback={<AbstractCore />}>
              <HeroModel />
            </ModelBoundary>
          ) : (
            <AbstractCore />
          )}
          <Sparkles count={90} scale={[14, 8, 8]} size={2.2} speed={0.35} color="#67e8f9" />
          <ContactShadows position={[0, -2.35, 0]} opacity={0.45} scale={12} blur={2.6} far={4} color="#000" />
        </Suspense>
      </Canvas>
    </div>
  );
}
