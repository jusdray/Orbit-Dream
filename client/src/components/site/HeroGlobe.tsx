/* Design: Orbital Editorial — a responsive Earth horizon remains secondary to readable hero copy. */
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const GLB_URL = "/assets/earth_D_N.glb";

type PointerState = { x: number; y: number; active: boolean };

function EarthModel({ pointer }: { pointer: React.RefObject<PointerState> }) {
  const { scene } = useGLTF(GLB_URL);
  const group = useRef<THREE.Group>(null);
  const drift = useRef(0);
  const tilt = useRef(0);

  const earth = useMemo(() => {
    const model = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(model);
    const dimensions = new THREE.Vector3();
    const centre = new THREE.Vector3();
    bounds.getSize(dimensions);
    bounds.getCenter(centre);
    const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z) || 1;

    model.position.sub(centre);
    const normalized = new THREE.Group();
    normalized.add(model);
    normalized.scale.setScalar(2 / largestDimension);
    return normalized;
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const cursor = pointer.current ?? { x: 0, y: 0, active: false };
    const targetTilt = cursor.active ? -cursor.y * 0.24 : 0;
    const targetYawSpeed = cursor.active ? 0.10 + cursor.x * 0.30 : 0.075;

    drift.current += targetYawSpeed * delta;
    tilt.current += (targetTilt - tilt.current) * Math.min(1, delta * 2.8);

    group.current.rotation.y = drift.current;
    group.current.rotation.x = tilt.current;
    group.current.rotation.z = 0.12 + cursor.x * 0.035;
    group.current.position.x += ((cursor.active ? cursor.x * 0.12 : 0) - group.current.position.x) * Math.min(1, delta * 2.2);
  });

  return <primitive ref={group} object={earth} />;
}

function EarthFallback({ pointer }: { pointer: React.RefObject<PointerState> }) {
  const group = useRef<THREE.Group>(null);
  const drift = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const cursor = pointer.current;
    drift.current += delta * (cursor.active ? 0.18 + cursor.x * 0.18 : 0.08);
    group.current.rotation.y = drift.current;
    group.current.rotation.x += ((cursor.active ? -cursor.y * 0.16 : 0) - group.current.rotation.x) * Math.min(1, delta * 2.2);
    group.current.position.x += ((cursor.active ? cursor.x * 0.1 : 0) - group.current.position.x) * Math.min(1, delta * 2.2);
  });

  return (
    <group ref={group} scale={1.7}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#155b77" roughness={0.72} metalness={0.08} emissive="#042b43" emissiveIntensity={0.35} />
      </mesh>
      <mesh scale={1.012}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#39d7ff" wireframe transparent opacity={0.11} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Atmosphere() {
  return (
    <>
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#2ec8ff"
          transparent
          opacity={0.11}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.18}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#1e9bff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default function HeroGlobe() {
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false });
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(GLB_URL, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
        const isModel = contentType.includes("model/gltf-binary") || contentType.includes("application/octet-stream");
        if (!cancelled) setModelAvailable(response.ok && isModel);
      })
      .catch(() => {
        if (!cancelled) setModelAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const container = host.current;
      if (!container) return;
      const bounds = container.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      pointer.current = { x, y, active: x > -1.35 && x < 1.35 && y > -1.35 && y < 1.35 };
    };
    const onPointerLeave = () => {
      pointer.current = { ...pointer.current, active: false };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={host} aria-hidden="true" className="absolute inset-0 z-[2] pointer-events-none" style={{ filter: "saturate(1.03) brightness(1.02)" }}>
      <Canvas camera={{ position: [0, 0, 3.6], fov: 42 }} dpr={[1, 1.5]} frameloop="always" gl={{ antialias: true, alpha: true }} style={{ background: "transparent", display: "block" }}>
        <ambientLight intensity={0.58} color="#a9ddff" />
        <directionalLight position={[-4, 2.2, 3]} intensity={2.7} color="#ffffff" />
        <directionalLight position={[2.5, 1, -3]} intensity={1.5} color="#38b6ff" />
        <pointLight position={[0, -2.5, 1.5]} intensity={0.45} color="#0a5c8f" />
        <Suspense fallback={<EarthFallback pointer={pointer} />}>
          {modelAvailable === true ? <EarthModel pointer={pointer} /> : <EarthFallback pointer={pointer} />}
          <Atmosphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
