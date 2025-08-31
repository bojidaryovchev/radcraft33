"use client";

import { useKeyPress } from "@/hooks/use-key-press.hook";
import React, { useState } from "react";
import EarthCanvas from "./earth-canvas";

const EarthSection: React.FC = () => {
  const [usable, setUsable] = useState<boolean>(false);

  useKeyPress("Control", () => setUsable(true), "keydown");

  useKeyPress("Control", () => setUsable(false), "keyup");

  return (
    <>
      <div className="h-screen relative">
        <div className="absolute inset-0">
          <EarthCanvas />
        </div>

        {!usable && <div className="absolute inset-0 z-10"></div>}
      </div>
    </>
  );
};

export default EarthSection;
