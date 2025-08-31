import { useVideoTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface OrbitingAdVideoProps {
  radius: number;
  speed: number; // radians/sec around Y
  angle: number; // start phase around ring
  src: string; // video url
  size?: [number, number]; // [width, height] in world units (default = portrait 9:16)
  scale?: number; // uniform scale
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
}

const OrbitingAdVideo: React.FC<OrbitingAdVideoProps> = ({
  radius,
  speed,
  angle,
  src,
  size = [1.0, 1.7778], // ~9:16 portrait
  scale = 1,
  muted = true,
  loop = true,
  autoPlay = true,
}) => {
  const groupRef = useRef<THREE.Group>(null); // rotates the orbit
  const adRef = useRef<THREE.Group>(null); // the panel that faces outward
  const { gl } = useThree();

  // video texture
  const tex = useVideoTexture(src, {
    start: autoPlay,
    loop,
    muted,
    crossOrigin: "anonymous",
  });

  // video textures don't mipmap; set filters to reduce shimmer
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = gl.capabilities.getMaxAnisotropy?.() ?? 1;

  const [panelW, panelH] = size;

  // "background-size: cover" crop via repeat/offset when we know video dimensions
  useEffect(() => {
    const video = tex.image as HTMLVideoElement | undefined;
    if (!video) return;

    const applyCover = () => {
      const vw = video.videoWidth || 1;
      const vh = video.videoHeight || 1;
      const videoAspect = vw / vh;
      const panelAspect = panelW / panelH;

      let repeatX = 1;
      let repeatY = 1;
      if (videoAspect > panelAspect) {
        // video wider than panel -> crop left/right
        repeatX = panelAspect / videoAspect;
      } else {
        // video taller than panel -> crop top/bottom
        repeatY = videoAspect / panelAspect;
      }

      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.offset.set((1 - repeatX) / 2, (1 - repeatY) / 2);
      tex.repeat.set(repeatX, repeatY);
      tex.needsUpdate = true;
    };

    // run once metadata is available
    if (video.readyState >= 1) applyCover();
    else {
      const onLoaded = () => applyCover();
      video.addEventListener("loadedmetadata", onLoaded, { once: true });
      return () => video.removeEventListener("loadedmetadata", onLoaded);
    }
  }, [tex, panelW, panelH]);

  // orbit + fixed outward orientation (upright 9:16)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.y = t * speed + angle;

    if (adRef.current && groupRef.current) {
      // keep upright relative to world (no roll/pitch), face outward from center
      const yaw = groupRef.current.rotation.y + Math.PI; // +Z points outward
      adRef.current.rotation.set(0, yaw, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={adRef} position={[radius, 0, 0]} scale={[scale, scale, scale]}>
        {/* single plane with video texture */}
        <mesh renderOrder={10}>
          <planeGeometry args={[panelW, panelH]} />
          <meshBasicMaterial
            map={tex}
            toneMapped={false}
            side={THREE.DoubleSide}
            depthTest
            depthWrite
            // keep a small polygon offset in case you add frames or overlaps later
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>
      </group>
    </group>
  );
};

export default OrbitingAdVideo;
