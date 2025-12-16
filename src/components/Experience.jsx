import {
  OrbitControls,
  Bounds,
  Environment,
  Gltf,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Loader } from "./Loader";
import * as THREE from "three";

export const Experience = () => {
  const glowingMeshRef = useRef(null);
  const originalMaterialRef = useRef(null);

  const handlePointerOver = (e) => {
    e.stopPropagation();

    console.log("Hovered:", e.object.name);
    console.log("----------------");

    if (e.object.name !== "BigNuclear") return;

    if (!originalMaterialRef.current) {
      originalMaterialRef.current = e.object.material;
      e.object.material = e.object.material.clone();
      glowingMeshRef.current = e.object;
    }

    e.object.material.emissive = new THREE.Color("white");
    e.object.material.emissiveIntensity = 0.1;
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();

    if (!glowingMeshRef.current) return;

    glowingMeshRef.current.material.emissive.set("black");
    glowingMeshRef.current.material.emissiveIntensity = 0;
    document.body.style.cursor = "default";
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <Environment preset="warehouse" />

      <OrbitControls
        makeDefault
        enableDamping={false}
        maxPolarAngle={Math.PI / 2.1}
      />


      <Suspense fallback={<Loader />}>
          <Gltf
            src="/models/smartLookRoom.glb"
            position={[2.5, -2.5, 7]}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
      </Suspense>
    </>
  );
};
