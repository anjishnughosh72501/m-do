"use client";

import React from "react";
import { motion } from "framer-motion";
import { GenreProfile } from "@/types";

interface GenreVisualizationProps {
  genreProfile: GenreProfile;
  accentColor?: string;
}

export const GenreVisualization: React.FC<GenreVisualizationProps> = ({
  genreProfile,
  accentColor = "#38bdf8",
}) => {
  const topGenres = genreProfile.topGenres.slice(0, 5);

  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-sans">
      {/* Top Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/15 pb-3 flex-shrink-0"
      >
        <span className="tracking-widest uppercase font-semibold text-white">
          02 // GENRE COMPOSITION
        </span>
        <div className="flex items-center gap-2 bg-purple-950/60 px-2.5 py-1 rounded border border-purple-500/30">
          <span className="text-purple-300 text-xs">GENRE DIVERSITY:</span>
          <span className="text-white font-bold font-mono">
            {Math.round(genreProfile.genreDiversity)} / 100
          </span>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="py-2 my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center max-w-2xl mx-auto w-full">
        {/* Left Side: Editorial Radial / Bubble SVG */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
            {/* SVG Connecting orbits */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin-slow"
              viewBox="0 0 200 200"
              style={{ animationDuration: "60s" }}
            >
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="4 4"
              />
              <circle
                cx="100"
                cy="100"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
              />
            </svg>

            {/* Center Core: Dominant Genre in High-Contrast Glowing Box */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-24 h-24 rounded-full border-2 border-cyan-400 bg-[#14192b] flex flex-col items-center justify-center text-center p-2 shadow-2xl shadow-cyan-500/20"
            >
              <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-semibold">
                DOMINANT
              </span>
              <span className="text-xs font-bold text-white truncate max-w-full mt-0.5">
                {genreProfile.dominantGenre.displayName}
              </span>
              <span className="text-base font-extrabold text-cyan-300 font-mono mt-0.5">
                {genreProfile.dominantGenre.percentage}%
              </span>
            </motion.div>

            {/* Orbiting Satellite Nodes */}
            {topGenres.slice(1, 4).map((genre, idx) => {
              const angles = [30, 150, 270];
              const angle = (angles[idx] * Math.PI) / 180;
              const radius = 68;
              const x = 100 + radius * Math.cos(angle);
              const y = 100 + radius * Math.sin(angle);

              return (
                <motion.div
                  key={genre.family}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                  className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#161a2b] flex flex-col items-center justify-center p-1 text-center shadow-lg"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                >
                  <span className="text-[10px] font-mono text-neutral-300 truncate max-w-full font-medium">
                    {genre.displayName.split(" ")[0]}
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    {genre.percentage}%
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Proportional Progress List Cards */}
        <div className="md:col-span-7 space-y-2.5">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono tracking-widest text-neutral-300 uppercase mb-2 font-semibold"
          >
            TOP GENRE FAMILIES
          </motion.div>
          {topGenres.map((genre, i) => (
            <motion.div
              key={genre.family}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              className="p-3 rounded-xl bg-[#131728] border border-white/15 space-y-1.5 shadow-md hover:border-white/30 transition-colors"
            >
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-white font-semibold flex items-center">
                  <span className="font-mono text-cyan-400 mr-2 text-xs">0{i + 1}</span>
                  {genre.displayName}
                </span>
                <span className="font-mono text-neutral-200 font-bold">
                  {genre.percentage}%
                </span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${genre.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: i === 0 ? accentColor : "rgba(255,255,255,0.45)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Insights Note Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="p-3.5 rounded-xl bg-[#111422] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-neutral-200 flex-shrink-0"
      >
        <div>
          Identified across{" "}
          <span className="text-white font-bold">
            {genreProfile.genreCount} genre families
          </span>
          .
        </div>
        <div className="text-cyan-300 font-medium italic">
          {genreProfile.genreDiversity > 75
            ? "Your listening rarely stays in a single lane."
            : "Your rotation maintains focused sonic cohesion."}
        </div>
      </motion.div>
    </div>
  );
};
