import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

interface RingTextProps {
  text: string;
  radius: number; // slightly above globe surface
  arcDegrees?: number; // total arc span
  speed?: number; // orbit speed (rad/s)
  tiltDeg?: number; // orbital plane tilt
  fontSize?: number;

  // Gradient across the arc
  colors: THREE.ColorRepresentation[]; // 1..N colors
  stops?: number[]; // optional N-1 stops (0..1 or 0..100, ascending)

  // Layout
  letterTightness?: number; // 1 = normal, <1 tighter, >1 wider
  wordGap?: number; // space width in "steps"
  reverseOrder?: boolean; // flip reading direction

  // Outline (Troika SDF — real border following glyph shape)
  outlineWidth?: number; // e.g. 0.1..0.6
  outlineColor?: THREE.ColorRepresentation;
  outlineBlur?: number; // 0 = crisp, higher = glow
  outlineOpacity?: number; // 0..1

  // Shadows
  castShadows?: boolean;
}

const normalizeStops = (count: number, stops?: number[]): number[] => {
  const needed = Math.max(0, count - 1);
  if (needed === 0) return [];
  if (!stops || stops.length !== needed) {
    return Array.from({ length: needed }, (_, i) => (i + 1) / count);
  }
  const perc = stops.some((s) => s > 1);
  const out = stops.map((s) => {
    const v = perc ? s / 100 : s;
    return Math.min(Math.max(v, 0), 1);
  });
  for (let i = 1; i < out.length; i += 1) {
    if (out[i] < out[i - 1]) out[i] = out[i - 1];
  }
  return out;
};

const sampleGradient = (palette: THREE.Color[], stops01: number[], t: number): THREE.Color => {
  if (palette.length === 1) return palette[0].clone();
  const n = palette.length;
  // segments: [0..stops[0]], [stops[0]..stops[1]], ..., [stops[n-2]..1]
  let left = 0;
  for (let i = 0; i < n - 1; i += 1) {
    const right = i < stops01.length ? stops01[i] : 1;
    if (t <= right || i === n - 2) {
      const span = Math.max(right - left, 1e-5);
      const lt = Math.min(Math.max((t - left) / span, 0), 1);
      const c = new THREE.Color().copy(palette[i]).lerp(palette[i + 1], lt);
      return c;
    }
    left = right;
  }
  return palette[n - 1].clone();
};

const RingText: React.FC<RingTextProps> = ({
  text,
  radius,
  arcDegrees = 120,
  speed = 0.6,
  tiltDeg = 12,
  fontSize = 8,

  colors,
  stops,

  letterTightness = 0.85,
  wordGap = 1.8,
  reverseOrder = false,

  outlineWidth = 0.18,
  outlineColor = "#000000",
  outlineBlur = 0.0,
  outlineOpacity = 1,

  castShadows = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += speed * dt;
  });

  const letters = useMemo(() => (reverseOrder ? [...text].reverse() : [...text]), [text, reverseOrder]);

  // Prepare gradient palette
  const palette = useMemo(() => colors.map((c) => new THREE.Color(c)), [colors]);
  const stops01 = useMemo(() => normalizeStops(palette.length, stops), [palette.length, stops]);

  // Angular layout (spaces consume wider step)
  const arc = THREE.MathUtils.degToRad(arcDegrees);
  const n = Math.max(letters.length, 1);
  const baseStep = n > 1 ? (arc / (n - 1)) * letterTightness : 0;

  const steps: number[] = [];
  for (let i = 0; i < letters.length - 1; i += 1) {
    steps.push(letters[i] === " " ? baseStep * wordGap : baseStep);
  }

  const totalUsed = steps.reduce((s, v) => s + v, 0);
  const start = -totalUsed / 2;

  const angles: number[] = new Array(letters.length).fill(0);
  for (let i = 1; i < letters.length; i += 1) {
    angles[i] = angles[i - 1] + steps[i - 1];
  }

  return (
    <group ref={groupRef} rotation={[THREE.MathUtils.degToRad(tiltDeg), 0, 0]}>
      {letters.map((ch, i) => {
        if (ch === " ") return null;

        const a = start + angles[i];
        const x = radius * Math.sin(a);
        const z = radius * Math.cos(a);
        const rotY = a; // face outward from center

        // 0..1 position along used arc (for gradient sampling)
        const t = totalUsed > 0 ? (a - start) / totalUsed : 0;
        const col = sampleGradient(palette, stops01, t);

        return (
          <Text
            key={`${ch}-${i}`}
            position={[x, 0, z]}
            rotation={[0, rotY, 0]}
            fontSize={fontSize}
            anchorX="center"
            anchorY="middle"
            color={col.getStyle()} // per-letter color from N-stop gradient
            outlineWidth={outlineWidth} // TRUE glyph border via SDF
            outlineColor={outlineColor}
            outlineBlur={outlineBlur}
            outlineOpacity={outlineOpacity}
            castShadow={castShadows}
            // keep both sides visible as the ring rotates

            material-side={THREE.DoubleSide}
          >
            {ch}
          </Text>
        );
      })}
    </group>
  );
};

export default RingText;
