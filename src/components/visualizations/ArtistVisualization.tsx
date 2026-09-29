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
        <span className="tracking-widest uppercase font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          03 // アーティスト親和 <span className="text-white/40">// ARTIST AFFINITY</span>
        </span>
        <div className="flex items-center gap-2 bg-blue-950/60 px-2.5 py-1 rounded border border-blue-500/30">
          <span className="text-blue-300 text-xs font-sans">忠誠度指数 // LOYALTY:</span>
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
          深く共鳴し続ける表現者 // THE ARTISTS YOU RETURN TO
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
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
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
                  最重要親和 // TOP
                </span>
              ) : (
                <span className="text-[11px] font-mono text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  親和順位 0{idx + 1}
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
        <div>
          上位5組で全親和性の <strong className="text-white font-bold">{artistProfile.top5Share}%</strong> を占有
        </div>
        <div className="italic text-cyan-300 font-medium font-sans">
          {loyaltyScore >= 60
            ? "馴染み深いディスコグラフィーへの深い忠誠と愛着を示しています。"
            : "特定の枠にとらわれず、多数の創作者の宇宙を横断しています。"}
        </div>
      </motion.div>
    </div>
  );
};
