import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF, useTexture } from "@react-three/drei";

const MODEL_URL = "/models/earth/scene.gltf";
const DIFFUSE_URL = "/models/earth/textures/Material.002_diffuse.jpeg";

useGLTF.preload(MODEL_URL);

interface Props {
  spinSpeed?: number; // radians per second
}

const EarthModel: React.FC<Props> = ({ spinSpeed = 0.08 }) => {
  const gltf = useGLTF(MODEL_URL);
  const diffuse = useTexture(DIFFUSE_URL);

  diffuse.colorSpace = THREE.SRGBColorSpace;
  diffuse.flipY = false;

  useLayoutEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.receiveShadow = true;

        const apply = (mat: THREE.Material) => {
          if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
            mat.map = diffuse;
            mat.color.set(0xffffff);
            mat.metalness = 0;
            mat.roughness = 1;
            mat.needsUpdate = true;
          }
        };

        if (Array.isArray(obj.material)) {
          for (const m of obj.material) {
            apply(m);
          }
        } else if (obj.material) {
          apply(obj.material);
        }
      }
    });
  }, [gltf.scene, diffuse]);

  useFrame((_, dt) => {
    gltf.scene.rotation.y += spinSpeed * dt;
  });

  return (
    <Center>
      <primitive object={gltf.scene} />
    </Center>
  );
};

export default EarthModel;
