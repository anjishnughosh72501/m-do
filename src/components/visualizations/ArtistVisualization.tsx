"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArtistProfile } from "@/types";

interface ArtistVisualizationProps {
  artistProfile: ArtistProfile;
  loyaltyScore: number;
  accentColor?: string;
}

export const ArtistVisualization: React.FC<ArtistVisualizationProps> = ({
  artistProfile,
  loyaltyScore,
  accentColor = "#38bdf8",
}) => {
  const topArtists = artistProfile.top5Artists;

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
          03 // ARTIST AFFINITY
        </span>
        <div className="flex items-center gap-2 bg-blue-950/60 px-2.5 py-1 rounded border border-blue-500/30">
          <span className="text-blue-300 text-xs">ARTIST LOYALTY:</span>
          <span className="text-white font-bold font-mono">
            {loyaltyScore} / 100
          </span>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="py-2 space-y-3.5 my-auto max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold"
        >
          THE ARTISTS YOU KEEP RETURNING TO
        </motion.div>

        <div className="space-y-2">
          {topArtists.map((artist, idx) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.12 + idx * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between group transition-all shadow-lg ${
                idx === 0
                  ? "bg-[#161c33]/90 border-cyan-400/50 shadow-cyan-950/40"
                  : "bg-[#121626]/85 border-white/15 hover:border-white/35 hover:bg-[#161b30]"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`font-mono text-xs sm:text-sm font-black w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 shadow-sm ${
                    idx === 0
                      ? "text-cyan-300 bg-cyan-950/80 border-cyan-400/60"
                      : "text-neutral-300 bg-neutral-900/80 border-white/10"
                  }`}
                >
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                    {artist.name}
                  </h3>
                  <div className="text-xs text-neutral-300 font-mono capitalize">
                    {artist.genres.slice(0, 2).join(" • ") || "Sonic Architecture"}
                  </div>
                </div>
              </div>

              {idx === 0 ? (
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border font-bold shadow-md animate-pulse"
                  style={{
                    borderColor: `${accentColor}88`,
                    backgroundColor: `${accentColor}25`,
                    color: accentColor,
                  }}
                >
                  TOP AFFINITY
                </span>
              ) : (
                <span className="text-[11px] font-mono text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  AFFINITY RANK
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Insights Note Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="p-3.5 rounded-xl bg-[#111422] border border-white/15 text-xs sm:text-sm text-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 flex-shrink-0"
      >
        <span>
          Top 5 account for{" "}
          <strong className="text-white font-bold">{artistProfile.top5Share}%</strong> of
          identified track affinity.
        </span>
        <span className="italic text-cyan-300 font-medium">
          {loyaltyScore >= 60
            ? "You return faithfully to familiar discographies."
            : "You explore often, moving freely between creator catalogs."}
        </span>
      </motion.div>
    </div>
  );
};
