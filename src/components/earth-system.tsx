import EarthModel from "./earth-model";
import OrbitingAdVideo from "./orbiting-ad-video";
import RingText from "./ring-text";

const EarthSystem: React.FC = () => {
  return (
    <>
      <EarthModel />
      <RingText
        text="SFX DIFF"
        radius={120}
        letterTightness={0.5}
        wordGap={1}
        fontSize={24}
        outlineWidth={0.4}
        outlineColor="#00d492"
        outlineOpacity={1}
        colors={["#00d492", "#b9f8cf", "#b9f8cf", "#00d492"]}
      />
      {Array.from({ length: 4 }).map((_, i) => (
        <OrbitingAdVideo
          key={`inner-${i}`}
          scale={40}
          radius={200}
          speed={0.3}
          angle={(i * Math.PI * 2) / 4}
          src="/output.mp4"
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <OrbitingAdVideo
          key={`outer-${i}`}
          scale={40}
          radius={280}
          speed={0.2}
          angle={(i * Math.PI * 2) / 4 + Math.PI / 4}
          src="/output.mp4"
        />
      ))}
    </>
  );
};

export default EarthSystem;
