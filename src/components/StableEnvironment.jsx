import { useThree } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect } from "react";

export default function StableEnvironment({ intensity = 1 }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    let pmrem, envMap;

    const loader = new RGBELoader();
    loader.load("/env/warehouse.exr", (texture) => {
      pmrem = new THREE.PMREMGenerator(gl);
      pmrem.compileEquirectangularShader();

      envMap = pmrem.fromEquirectangular(texture).texture;

      scene.environment = envMap;
      scene.background = null; // keep your gradient

      texture.dispose();
    });

    return () => {
      scene.environment = null;
      envMap?.dispose();
      pmrem?.dispose();
    };
  }, [gl, scene]);

  return null;
}
