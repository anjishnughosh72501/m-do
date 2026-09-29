"use client";

import React from "react";
import { MusicProfile } from "@/types";
import { GlassButton } from "../glass/GlassButton";

interface FinalSummaryViewProps {
  profile: MusicProfile;
  onAnalyzeAnother: () => void;
  onRunAgain: () => void;
  onDisconnect: () => void;
}

export const FinalSummaryView: React.FC<FinalSummaryViewProps> = ({
  profile,
  onAnalyzeAnother,
  onRunAgain,
  onDisconnect,
}) => {
  const accentColor = profile.archetype.visualProfile.accent;

  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/15 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest uppercase font-semibold text-white">
            08 // MŪDO IDENTITY DOSSIER (ムード)
          </span>
        </div>
        <button
          onClick={onDisconnect}
          className="text-neutral-400 hover:text-white text-xs underline underline-offset-4 transition-colors cursor-pointer font-sans"
        >
          Disconnect Spotify
        </button>
      </div>

      {/* Main Content Area */}
      <div className="py-2 space-y-4 max-w-2xl mx-auto w-full">
        {/* Archetype Identity Banner Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#121626] border border-white/20 shadow-xl flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              FINAL MUSIC ARCHETYPE
            </span>
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mt-0.5"
              style={{ color: accentColor }}
            >
              {profile.archetype.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
              {profile.archetype.subtitle}
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto flex-shrink-0">
            {profile.datasetSize.artists} ARTISTS • {profile.datasetSize.genres} GENRES • {profile.datasetSize.tracks} TRACKS
          </div>
        </div>

        {/* 4 Distinct Contrasting Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#141829] border border-white/20 shadow-lg text-center flex flex-col justify-between group hover:border-cyan-400/50 transition-all">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              {profile.explorationScore}
            </span>
            <div className="text-xs font-mono uppercase font-semibold text-cyan-300 mt-2 bg-cyan-950/60 py-0.5 rounded border border-cyan-500/20">
              Exploration
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#141829] border border-white/20 shadow-lg text-center flex flex-col justify-between group hover:border-purple-400/50 transition-all">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              {Math.round(profile.dimensions.genreDiversity)}
            </span>
            <div className="text-xs font-mono uppercase font-semibold text-purple-300 mt-2 bg-purple-950/60 py-0.5 rounded border border-purple-500/20">
              Genre Spread
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#141829] border border-white/20 shadow-lg text-center flex flex-col justify-between group hover:border-blue-400/50 transition-all">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              {profile.loyaltyScore}
            </span>
            <div className="text-xs font-mono uppercase font-semibold text-blue-300 mt-2 bg-blue-950/60 py-0.5 rounded border border-blue-500/20">
              Loyalty Index
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#141829] border border-white/20 shadow-lg text-center flex flex-col justify-between group hover:border-amber-400/50 transition-all">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              {profile.recentChangeScore}
            </span>
            <div className="text-xs font-mono uppercase font-semibold text-amber-300 mt-2 bg-amber-950/60 py-0.5 rounded border border-amber-500/20">
              Recent Shift
            </div>
          </div>
        </div>

        {/* Core Archetype Strengths (Fixes Audit P2-1) */}
        {profile.archetype.strengths && profile.archetype.strengths.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#101322] border border-white/15 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold block text-left">
              DISTILLED LISTENING SUPERPOWERS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
              {profile.archetype.strengths.map((str, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-[#141829] border border-white/10 text-xs text-neutral-200 flex items-start gap-2 shadow-sm"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="leading-snug">{str}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Narrative Insight Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#121626] border border-white/20 shadow-xl text-sm text-neutral-200 leading-relaxed font-sans space-y-2">
          <p className="font-bold text-white text-base">
            {profile.insights.headline}
          </p>
          <p className="text-neutral-300 text-xs sm:text-sm">
            {profile.insights.summaryNote}
          </p>
          <p className="text-neutral-400 text-xs leading-normal pt-1 border-t border-white/10">
            {profile.insights.patternNote}
          </p>
        </div>
      </div>

      {/* Bottom Action Buttons (Always Pinned and Visible) */}
      <div className="border-t border-white/15 pt-3 flex-shrink-0 flex flex-col sm:flex-row items-center justify-center gap-3">
        <GlassButton
          variant="primary"
          size="md"
          onClick={onAnalyzeAnother}
          className="w-full sm:w-auto font-semibold bg-white/15 hover:bg-white/25 border-white/30"
        >
          Analyze Another Period
        </GlassButton>
        <GlassButton
          variant="secondary"
          size="md"
          onClick={onRunAgain}
          className="w-full sm:w-auto font-medium"
        >
          Run Experience Again
        </GlassButton>
      </div>
    </div>
  );
};
