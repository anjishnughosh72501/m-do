"use client";

import React from "react";
import { motion } from "framer-motion";
import { MusicProfile } from "@/types";

interface UniverseViewProps {
  profile: MusicProfile;
}

function Counter({ value, duration = 850 }: { value: number; duration?: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(start + (end - start) * ease));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return <span>{count}</span>;
}

export const UniverseView: React.FC<UniverseViewProps> = ({ profile }) => {
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
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          01 // LISTENING UNIVERSE
        </span>
        <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30 font-mono text-[11px]">
          AFFINITY HORIZON
        </span>
      </motion.div>

      {/* Main Content Area */}
      <div className="py-2 space-y-5 my-auto max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center sm:text-left"
        >
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
            CATALOG HORIZON
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mt-1 uppercase">
            YOUR LISTENING UNIVERSE
          </h2>
        </motion.div>

        {/* 3 High-Contrast Metric Boxes with Live Counter Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Tracks Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 rounded-2xl bg-[#121626]/90 border border-white/20 shadow-2xl flex flex-col justify-between group hover:border-cyan-400/50 hover:bg-[#161c33] transition-all"
          >
            <div>
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                <Counter value={profile.datasetSize.tracks} />
              </span>
              <div className="mt-2 text-xs font-mono tracking-widest uppercase font-semibold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20 inline-block">
                TOP TRACKS
              </div>
            </div>
            <span className="mt-2 text-xs text-neutral-400 font-sans">
              Ranked by Spotify affinity
            </span>
          </motion.div>

          {/* Artists Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 rounded-2xl bg-[#121626]/90 border border-white/20 shadow-2xl flex flex-col justify-between group hover:border-purple-400/50 hover:bg-[#161c33] transition-all"
          >
            <div>
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                <Counter value={profile.datasetSize.artists} />
              </span>
              <div className="mt-2 text-xs font-mono tracking-widest uppercase font-semibold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20 inline-block">
                ARTISTS
              </div>
            </div>
            <span className="mt-2 text-xs text-neutral-400 font-sans">
              In active rotation
            </span>
          </motion.div>

          {/* Genre Families Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 rounded-2xl bg-[#121626]/90 border border-white/20 shadow-2xl flex flex-col justify-between group hover:border-emerald-400/50 hover:bg-[#161c33] transition-all"
          >
            <div>
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-400 font-mono">
                <Counter value={profile.datasetSize.genres} />
              </span>
              <div className="mt-2 text-xs font-mono tracking-widest uppercase font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
                GENRE FAMILIES
              </div>
            </div>
            <span className="mt-2 text-xs text-neutral-400 font-sans">
              Distinct sonic landscapes
            </span>
          </motion.div>
        </div>

        {/* Narrative Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="p-4 rounded-xl bg-[#111422] border border-white/15 text-sm text-neutral-200 font-sans leading-relaxed shadow-lg"
        >
          {profile.insights.universeNote}
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-white/15 pt-3 text-xs text-neutral-400 font-mono flex items-center justify-between flex-shrink-0">
        <span>SPOTIFY DATA NORMALIZATION: VERIFIED</span>
        <span className="text-cyan-400">STAGE 01 COMPLETE</span>
      </div>
    </div>
  );
};
