import React from "react";
import { GlassPill } from "../glass/GlassPill";

interface ProgressIndicatorProps {
  currentScene: number; // 1 to 9
  totalScenes?: number;
  sceneName?: string;
  accentColor?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentScene,
  totalScenes = 9,
  sceneName,
  accentColor = "#38bdf8",
}) => {
  const formattedCurrent = currentScene < 10 ? `0${currentScene}` : `${currentScene}`;
  const formattedTotal = totalScenes < 10 ? `0${totalScenes}` : `${totalScenes}`;

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-40 flex items-center gap-3 select-none pointer-events-none">
      {sceneName && (
        <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest text-white/40 uppercase">
          {sceneName}
        </span>
      )}
      <GlassPill className="font-mono text-[11px] border-white/15 bg-black/40 backdrop-blur-md">
        <span style={{ color: accentColor }} className="font-bold">
          {formattedCurrent}
        </span>
        <span className="text-white/30">/</span>
        <span className="text-white/50">{formattedTotal}</span>
      </GlassPill>
    </div>
  );
};
