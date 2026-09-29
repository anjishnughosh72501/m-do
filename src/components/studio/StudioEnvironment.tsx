"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArchetypeVisualProfile } from "@/types";

interface StudioEnvironmentProps {
  roomEnterProgress: number; // 0.0 to 1.0 (controlling room visibility upon entering)
  monitorZoomProgress: number; // 0.0 to 1.0 (controlling slow camera zoom into monitor)
  activeSceneKey?: string;
  visualProfile?: ArchetypeVisualProfile;
  onScrollDelta?: (deltaY: number) => void;
  children: React.ReactNode; // The monitor content
}

export const StudioEnvironment: React.FC<StudioEnvironmentProps> = ({
  roomEnterProgress,
  monitorZoomProgress,
  activeSceneKey,
  visualProfile,
  onScrollDelta,
  children,
}) => {
  const monitorScreenRef = useRef<HTMLDivElement>(null);

  // When activeSceneKey changes, scroll monitor back to top so every scene starts cleanly
  useEffect(() => {
    if (monitorScreenRef.current) {
      monitorScreenRef.current.scrollTop = 0;
    }
  }, [activeSceneKey]);

  // Spatial Pacing:
  // 1. Full studio background image reveals as user passes through the door (roomEnterProgress: 0 -> 1)
  // 2. Wide room view stays prominent and immersive while monitor is at true room distance
  // 3. Camera then glides slowly and majestically forward onto the monitor (monitorZoomProgress: 0 -> 1)
  const roomOpacity = Math.min(1, Math.max(0, roomEnterProgress));

  // Cinematic spatial camera dolly onto the monitor:
  // Starts at 0.42 scale (natural in-room distance on studio console desk), slowly glides to 1.0 (focused view)
  const monitorScale = 0.42 + monitorZoomProgress * 0.58;
  const monitorTranslateY = (1 - monitorZoomProgress) * 90;
  const monitorRotateX = (1 - monitorZoomProgress) * 5.5;

  // Background blur and focal depth shifts as camera approaches the monitor
  const backgroundBlur = monitorZoomProgress * 4.0;
  const backgroundBrightness = 0.55 - monitorZoomProgress * 0.15;
  const backgroundScale = 1.06 - monitorZoomProgress * 0.04;

  const accentColor = visualProfile?.accent || "#38bdf8";
  const glowIntensity = visualProfile?.glowIntensity || 0.65;
  const studioImage = visualProfile?.studioImage || "/studios/studio-explorer.png";

  // Handle wheel events inside the monitor:
  // Allows natural scrolling inside the monitor window.
  // When at top or bottom boundaries, forwards scroll to smooth Lenis timeline!
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = monitorScreenRef.current;
    if (!el) return;

    const isScrollable = el.scrollHeight > el.clientHeight + 4;
    const isAtTop = el.scrollTop <= 2;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;

    if (!isScrollable || (isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
      if (onScrollDelta) {
        onScrollDelta(e.deltaY);
      } else {
        window.scrollBy({ top: e.deltaY, behavior: "auto" });
      }
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        opacity: roomOpacity,
        transition: "opacity 0.25s ease-out",
        display: roomOpacity <= 0 ? "none" : "flex",
      }}
    >
      {/* 1. Full-Screen Custom Studio Background Image (Shows up first) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={studioImage}
          alt="Music Studio Chamber"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-700"
          style={{
            transform: `scale(${backgroundScale})`,
            filter: `brightness(${backgroundBrightness}) contrast(1.15) saturate(1.25) blur(${backgroundBlur}px)`,
          }}
        />

        {/* Ambient Dark Vignette & Subtle Color Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/70" />
        <div
          className="absolute inset-0 mix-blend-color-dodge opacity-25 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: accentColor }}
        />

        {/* Studio Console Desk Horizon Plane in Perspective */}
        <div
          className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#06070a] via-[#090b14]/90 to-transparent pointer-events-none opacity-90 transition-opacity duration-500"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.07)",
            boxShadow: "0 -20px 50px rgba(0, 0, 0, 0.7)",
          }}
        />
      </div>

      {/* 2. Dynamic Ambient Room Lighting based on Archetype */}
      <div
        className="studio-ambient-glow z-0"
        style={
          {
            "--accent-glow": visualProfile?.accentGlow || "rgba(56, 189, 248, 0.35)",
            "--room-glow-opacity": glowIntensity,
          } as React.CSSProperties
        }
      />

      {/* Spatial Approach Prompt (When room is visible at a distance before reaching monitor) */}
      {roomEnterProgress >= 0.7 && monitorZoomProgress < 0.7 && (
        <div className="absolute top-16 z-30 flex flex-col items-center gap-1.5 pointer-events-none animate-pulse">
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold">
            ● STUDIO CHAMBER INITIALIZED
          </span>
          <span className="text-sm font-sans text-white/80 font-light">
            Scroll to approach master monitor
          </span>
        </div>
      )}

      {/* 3. Central Master Studio Monitor Console (Dollys smoothly from console desk to eye-level focus) */}
      <div
        className="relative z-10 w-full max-w-5xl px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center transition-transform duration-150 ease-out"
        style={{
          transform: `perspective(1100px) scale(${monitorScale}) translateY(${monitorTranslateY}px) rotateX(${monitorRotateX}deg)`,
          transformOrigin: "50% 65%",
        }}
      >
        <div
          className="monitor-frame w-full h-[66vh] sm:h-[72vh] md:h-[76vh] max-h-[760px] min-h-[500px] flex flex-col p-2.5 sm:p-3.5 md:p-4 z-10 transition-shadow duration-1000 backdrop-blur-md bg-neutral-950/85 border border-white/20 shadow-2xl rounded-2xl"
          style={
            {
              "--accent-glow": visualProfile?.accentGlow || `${accentColor}44`,
            } as React.CSSProperties
          }
        >
          {/* Top Monitor Bezel Status Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/15 text-xs font-mono text-white/60 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ backgroundColor: accentColor }}
              />
              <span className="tracking-widest uppercase font-semibold text-white">
                MŪDO OS (ムード) // v2.6
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[11px]">
              <span>AUDIO SIGNAL: 96kHz / 24bit</span>
              <span>CHAMBER: ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-semibold text-[11px]">
                DSP: DETERMINISTIC
              </span>
            </div>
          </div>

          {/* Screen Content Container with data-lenis-prevent and Smooth Scroll Support */}
          <div
            ref={monitorScreenRef}
            data-lenis-prevent="true"
            tabIndex={0}
            onWheel={handleWheel}
            className="monitor-screen flex-1 relative w-full h-full p-3 sm:p-5 md:p-6 flex flex-col overflow-y-auto overscroll-contain select-text outline-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          >
            {children}
          </div>
        </div>

        {/* Minimalist Sleek Monitor Neck & Stand (Piano keys section completely removed) */}
        <div className="relative w-full flex flex-col items-center z-0">
          <div className="w-16 h-6 bg-gradient-to-b from-neutral-800 to-neutral-950 border-x border-white/10" />
          <div className="w-48 h-2.5 bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 rounded-t border-t border-white/20 shadow-lg" />
        </div>
      </div>
    </div>
  );
};
