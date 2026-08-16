"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
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

function AbstractCore({ mobile = false }: { mobile?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduced.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (reduced.current) return;
    // mouse-follow rotation
    g.rotation.y += (state.pointer.x * 0.55 - g.rotation.y) * delta * 2.2;
    g.rotation.x += (state.pointer.y * -0.35 - g.rotation.x) * delta * 2.2;
    // slow self-rotation
    g.rotation.z += delta * 0.025;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh>
          <torusKnotGeometry args={[1.15, 0.34, mobile ? 96 : 220, mobile ? 20 : 32]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
            emissive="#3b82f6"
            emissiveIntensity={0.18}
            wireframe={false}
          />
        </mesh>

        <mesh scale={1.65}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.12} />
        </mesh>

        <mesh>
          <sphereGeometry args={[mobile ? 0.5 : 0.52, mobile ? 24 : 48, mobile ? 24 : 48]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.4}
            roughness={0.05}
            emissive="#7c3aed"
            emissiveIntensity={0.8}
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
  const [mobile, setMobile] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(el);
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={mobile ? [1, 1.35] : [1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={isDark ? 0.35 : 0.6} />
        <pointLight position={[6, 4, 6]} intensity={isDark ? 90 : 60} color="#3b82f6" />
        <pointLight position={[-6, -3, 4]} intensity={isDark ? 60 : 40} color="#a855f7" />
        <directionalLight position={[0, 6, 4]} intensity={isDark ? 0.7 : 0.9} color="#ffffff" />

        <Suspense fallback={null}>
          <SceneRig />
          {MODEL_URL ? (
            <ModelBoundary fallback={<AbstractCore mobile={mobile} />}>
              <HeroModel />
            </ModelBoundary>
          ) : (
            <AbstractCore mobile={mobile} />
          )}
          <Sparkles count={mobile ? 40 : 90} scale={[14, 8, 8]} size={mobile ? 1.6 : 2.2} speed={0.35} color={isDark ? "#67e8f9" : "#818cf8"} />
          {!mobile && (
            <ContactShadows position={[0, -2.35, 0]} opacity={isDark ? 0.45 : 0.25} scale={12} blur={2.6} far={4} color={isDark ? "#000" : "#94a3b8"} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
