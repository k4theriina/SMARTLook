import { useEffect } from 'react'
import * as THREE from 'three';
import './App.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

function App() {

  useEffect(() => {

    // Get canvas
    const canvas = document.getElementById('myThreeJsCanvas');
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    // Test Cube
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    

    // Animate
    const animate = () => {
      // boxMesh.rotation.x += 0.01;
      // boxMesh.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      <canvas
        id="myThreeJsCanvas"
      />
    </>
  )
}

export default App
