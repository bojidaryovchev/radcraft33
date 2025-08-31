"use client";

import { OrbitControls, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import EarthSystem from "./earth-system";

const EarthCanvas: React.FC = () => {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      shadows
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 600], fov: 45 }}
    >
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.2} />

      <Suspense fallback={null}>
        {/* Wrap the whole Earth + ads in PresentationControls */}
        <PresentationControls
          global={false}
          cursor
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Infinity, Infinity]}
        >
          <group>
            {/* light rotates with the Earth */}
            <directionalLight
              position={[120, 160, 80]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-near={10}
              shadow-camera-far={800}
              shadow-camera-left={-250}
              shadow-camera-right={250}
              shadow-camera-top={250}
              shadow-camera-bottom={-250}
              shadow-bias={-0.0005}
              shadow-normalBias={0.02}
            />
            <EarthSystem />
          </group>
        </PresentationControls>
      </Suspense>

      {/* Use OrbitControls for zoom only (no rotate/pan) */}
      <OrbitControls
        makeDefault
        target={[0, 0, 0]}
        enableRotate={false}
        enablePan={false}
        enableZoom
        zoomSpeed={0.9}
        minDistance={80}
        maxDistance={800}
      />
    </Canvas>
  );
};

export default EarthCanvas;
