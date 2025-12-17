import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const SmartRoom = (props) => {
  const { scene, nodes } = useGLTF("/models/smartLookRoom.glb");
  const pump = nodes.BigNuclear;

  const originalMaterial = useRef(null);

  // Freeze static scene (perf)
  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.matrixAutoUpdate = false;
      obj.updateMatrix();
      obj.frustumCulled = true;
    });
  }, [scene]);

  const onPointerOver = (e) => {
    e.stopPropagation();

    if (!originalMaterial.current) {
      originalMaterial.current = pump.material;
      pump.material = pump.material.clone();
    }

    pump.material.emissive.set("white");
    pump.material.emissiveIntensity = 0.15;
    document.body.style.cursor = "pointer";
  };

  const onPointerOut = (e) => {
    e.stopPropagation();

    pump.material.emissive.set("black");
    pump.material.emissiveIntensity = 0;
    document.body.style.cursor = "default";
  };

  return (
    <primitive object={scene} {...props}>
      <primitive
        object={pump}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
    </primitive>
  );
};
