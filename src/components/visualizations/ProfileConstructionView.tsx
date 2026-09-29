"use client";

import React from "react";
import { motion } from "framer-motion";
import { MusicDimensions } from "@/types";

interface ProfileConstructionViewProps {
  dimensions: MusicDimensions;
  accentColor?: string;
}

export const ProfileConstructionView: React.FC<ProfileConstructionViewProps> = ({
  dimensions,
  accentColor = "#38bdf8",
}) => {
  // 6 Primary Dimensional Axes for the Polygon Radar
  const axes = [
    { key: "exploration", jp: "探求性", en: "EXPLORATION", value: dimensions.exploration },
    { key: "genreDiversity", jp: "ジャンル多様", en: "DIVERSITY", value: dimensions.genreDiversity },
    { key: "artistDiversity", jp: "作家分散", en: "SPREAD", value: dimensions.artistDiversity },
    { key: "recentChange", jp: "変遷度", en: "SHIFT", value: dimensions.recentChange },
    { key: "loyalty", jp: "忠誠度", en: "LOYALTY", value: dimensions.loyalty },
    { key: "consistency", jp: "一貫性", en: "CONSISTENCY", value: dimensions.listeningConsistency },
  ];

  const center = 100;
  const radius = 70;

  const getCoordinates = (value: number, angleIndex: number, total: number) => {
    const angle = (angleIndex * (2 * Math.PI)) / total - Math.PI / 2;
    const r = (Math.max(10, Math.min(100, value)) / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const coords = axes.map((axis, i) =>
    getCoordinates(axis.value, i, axes.length)
  );

  const points = coords.map((c) => `${c.x},${c.y}`).join(" ");

  // SVG closed path definition for stroke drawing animation
  const polygonPathD =
    coords.reduce(
      (acc, pt, i) =>
        i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`,
      ""
    ) + " Z";

  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-sans select-none">
      {/* Top Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/15 pb-3 flex-shrink-0"
      >
        <span className="tracking-widest uppercase font-semibold text-white flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: accentColor }}
          />
          06 // 構造合成 <span className="text-white/40">// PROFILE SYNTHESIS</span>
        </span>
        <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30 text-[11px] font-mono">
          六軸多角形レーダー // 6-AXIS RADAR
        </span>
      </motion.div>

      {/* Main Radar Polygon Visualization */}
      <div className="py-2 my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center max-w-2xl mx-auto w-full">
        {/* Radar SVG with Live Construction Sequence */}
        <div className="md:col-span-6 flex justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center p-2 rounded-2xl bg-[#101322]/90 border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 70%)`,
              }}
            />

            <svg className="w-full h-full relative z-10" viewBox="0 0 200 200">
              {/* Background Concentric Polygon Rings */}
              {[0.25, 0.5, 0.75, 1.0].map((level, ringIdx) => {
                const ringPoints = axes
                  .map((_, i) => {
                    const angle =
                      (i * (2 * Math.PI)) / axes.length - Math.PI / 2;
                    const r = level * radius;
                    return `${center + r * Math.cos(angle)},${
                      center + r * Math.sin(angle)
                    }`;
                  })
                  .join(" ");
                return (
                  <polygon
                    key={ringIdx}
                    points={ringPoints}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis Spoke Lines Animating from Center */}
              {axes.map((_, i) => {
                const angle =
                  (i * (2 * Math.PI)) / axes.length - Math.PI / 2;
                const targetX = center + radius * Math.cos(angle);
                const targetY = center + radius * Math.sin(angle);
                return (
                  <motion.line
                    key={i}
                    x1={center}
                    y1={center}
                    initial={{ x2: center, y2: center, opacity: 0 }}
                    animate={{ x2: targetX, y2: targetY, opacity: 1 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + i * 0.05,
                      ease: "easeOut",
                    }}
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                );
              })}

              {/* Animated Drawing of the Outer Polygon Perimeter */}
              <motion.path
                d={polygonPathD}
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.0,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ filter: `drop-shadow(0 0 6px ${accentColor}88)` }}
              />

              {/* Luminous Interior Mesh Polygon Fill Fade-In */}
              <motion.polygon
                points={points}
                fill={`${accentColor}28`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              />

              {/* Interactive/Animated Data Vertex Points */}
              {coords.map((pt, i) => (
                <motion.circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill="#ffffff"
                  stroke={accentColor}
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.55 + i * 0.08,
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.8))" }}
                />
              ))}
            </svg>
          </motion.div>
        </div>

        {/* Right Side: Dimension Scores in High-Contrast Cards */}
        <div className="md:col-span-6 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono tracking-widest text-neutral-300 uppercase mb-2 font-semibold"
          >
            構造次元スコア // SYNTHESIZED DIMENSIONS
          </motion.div>
          <div className="grid grid-cols-2 gap-2.5">
            {axes.map((axis, idx) => (
              <motion.div
                key={axis.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.06 }}
                className="p-3 rounded-xl bg-[#131728] border border-white/20 shadow-md flex flex-col justify-between group hover:border-cyan-400/50 transition-colors"
              >
                <div>
                  <span className="text-xs font-serifJp font-bold text-white block">
                    {axis.jp}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    {axis.en}
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
                  {Math.round(axis.value)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="border-t border-white/15 pt-3 text-xs text-neutral-300 font-mono flex items-center justify-between flex-shrink-0"
      >
        <span>肖像マトリクス算出: 完了 // SYNTHESIS COMPLETE</span>
        <span className="text-cyan-400 font-bold animate-pulse">
          肖像顕現へ進む // REVEAL →
        </span>
      </motion.div>
    </div>
  );
};
