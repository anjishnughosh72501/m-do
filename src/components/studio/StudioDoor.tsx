"use client";

import React from "react";
import Image from "next/image";

interface StudioDoorProps {
  doorProgress: number; // 0.0 to 1.0
  doorEntryProgress: number; // 0.0 to 1.0 (walk-in camera push)
  accentColor?: string;
  isReadyToEnter: boolean;
  analysisStep?: string;
  analysisProgress?: number; // 0 to 100
}

export const StudioDoor: React.FC<StudioDoorProps> = ({
  doorEntryProgress,
  accentColor = "#38bdf8",
  isReadyToEnter,
  analysisStep = "Analyzing listening profile...",
  analysisProgress = 0,
}) => {
  // If camera has walked fully through the doorway, unmount completely
  if (doorEntryProgress >= 1.0) {
    return null;
  }

  const effectiveEntryProgress = isReadyToEnter ? doorEntryProgress : 0;

  // Direct Walk-In Camera Push:
  // Smoothly scales towards the open doorway opening (approx 49% horizontal, 47% vertical)
  const cameraScale = 1 + effectiveEntryProgress * 3.8;
  const cameraOpacity = Math.max(0, 1 - effectiveEntryProgress * 1.3);

  // Status HUD dissolves immediately as user starts walking in
  const hudOpacity = Math.max(0, 1 - effectiveEntryProgress * 4.0);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-20 transition-opacity duration-200 bg-black"
      style={{
        transform: `scale(${cameraScale})`,
        opacity: cameraOpacity,
        transformOrigin: "49% 47%",
        display: cameraOpacity <= 0 ? "none" : "flex",
      }}
    >
      {/* 1. Master Reference Image: The Open Doorway with Volumetric Floor Light */}
      <div className="relative w-full h-full max-w-[1920px] max-h-[1280px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/door/door-open.png"
            alt="Cinematic Luminous Doorway"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Vignette Gradients for seamless blend into pitch-black background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />

          {/* Dynamic Musical Archetype Warm Light Tint */}
          <div
            className="absolute inset-0 mix-blend-color-dodge opacity-20 pointer-events-none transition-colors duration-1000"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* 2. Sleek, Non-Overlapping Analysis & Access HUD at Bottom */}
        <div
          className="absolute z-20 flex flex-col items-center pointer-events-none transition-all duration-300"
          style={{
            opacity: hudOpacity,
            bottom: "8%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "90%",
            maxWidth: "460px",
          }}
        >
          <div className="w-full p-4 sm:p-5 rounded-2xl bg-[#0c0e17]/90 border border-white/20 shadow-2xl backdrop-blur-md space-y-3">
            {/* Top Status Header */}
            <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2.5">
              <span className="text-neutral-300 uppercase tracking-widest font-semibold flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isReadyToEnter
                      ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                      : "bg-amber-400 animate-ping"
                  }`}
                />
                STUDIO CHAMBER 01
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-bold border ${
                  isReadyToEnter
                    ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/15"
                    : "text-amber-400 border-amber-500/40 bg-amber-500/15"
                }`}
              >
                {isReadyToEnter ? "UNLOCKED" : "LOCKED"}
              </span>
            </div>

            {/* Analysis Step & Live Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span
                  className={`font-semibold ${
                    isReadyToEnter ? "text-emerald-300 font-bold" : "text-neutral-200"
                  }`}
                >
                  {isReadyToEnter
                    ? "✓ ANALYSIS COMPLETE // READY TO ENTER"
                    : analysisStep}
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  {isReadyToEnter ? "100%" : `${analysisProgress}%`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isReadyToEnter
                      ? "w-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
                      : "bg-amber-400 animate-pulse"
                  }`}
                  style={!isReadyToEnter ? { width: `${analysisProgress}%` } : {}}
                />
              </div>
            </div>

            {/* Action Tagline */}
            <div className="pt-0.5 text-[11px] font-mono text-center">
              {isReadyToEnter ? (
                <span className="text-emerald-300 font-semibold tracking-wider animate-pulse flex items-center justify-center gap-1.5">
                  ACCESS GRANTED • SCROLL OR USE ↓ TO WALK IN
                </span>
              ) : (
                <span className="text-neutral-400 tracking-wider">
                  HOLD POSITION • PREPARING ENVIRONMENT...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3. Luminous Threshold Bloom as Camera Walks into the Light */}
        {effectiveEntryProgress > 0.35 && (
          <div
            className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: Math.min(1, (effectiveEntryProgress - 0.35) * 1.8),
              background:
                "radial-gradient(circle at 49% 47%, rgba(254, 240, 138, 0.98) 0%, rgba(245, 158, 11, 0.7) 45%, rgba(0, 0, 0, 0.9) 85%)",
            }}
          />
        )}
      </div>
    </div>
  );
};
