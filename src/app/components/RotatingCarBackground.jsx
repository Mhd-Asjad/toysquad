"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";


// Replace this with your car model (GLTF/GLB)
function CarModel(props) {
  const ref = useRef();
  const { scene } = useGLTF("/models/car2.glb");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005; 
    }
  });

  return <primitive ref={ref} object={scene} scale={0.8} {...props} />;
}


export default function RotatingCarBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 1, 6] }}>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Car */}
        <CarModel />

        {/* Optional controls (disable for production) */}
        <OrbitControls
          enablePan={true}   // allow moving the view
          enableZoom={true}  // allow zoom in/out
          enableRotate={true} // allow rotate with click + drag
          autoRotate={false} // set true if you want slow spin even without dragging
          autoRotateSpeed={0.5}
    />      
    </Canvas>
    </div>
  );
}

useGLTF.preload('/models/car2.glb')