"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { MusicProfile, TimeRange } from "@/types";
import { StudioDoor } from "./StudioDoor";
import { StudioEnvironment } from "./StudioEnvironment";
import { MonitorBoot } from "./MonitorBoot";
import { UniverseView } from "../visualizations/UniverseView";
import { GenreVisualization } from "../visualizations/GenreVisualization";
import { ArtistVisualization } from "../visualizations/ArtistVisualization";
import { ExplorationView } from "../visualizations/ExplorationView";
import { PeriodComparisonView } from "../visualizations/PeriodComparisonView";
import { ProfileConstructionView } from "../visualizations/ProfileConstructionView";
import { ArchetypeRevealView } from "../visualizations/ArchetypeRevealView";
import { FinalSummaryView } from "../visualizations/FinalSummaryView";
import { ProgressIndicator } from "./ProgressIndicator";

gsap.registerPlugin(ScrollTrigger);

interface StudioTimelineProps {
  profile: MusicProfile;
  timeRange: TimeRange;
  isReadyToEnter: boolean;
  analysisStep?: string;
  analysisProgress?: number;
  onAnalyzeAnother: () => void;
  onDisconnect: () => void;
}

export const StudioTimeline: React.FC<StudioTimelineProps> = ({
  profile,
  timeRange,
  isReadyToEnter,
  analysisStep,
  analysisProgress,
  onAnalyzeAnother,
  onDisconnect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isReadyToEnterRef = useRef(isReadyToEnter);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Keep isReadyToEnterRef in sync with prop
  useEffect(() => {
    isReadyToEnterRef.current = isReadyToEnter;
    if (lenisRef.current) {
      if (isReadyToEnter) {
        lenisRef.current.start();
        ScrollTrigger.refresh();
      } else {
        lenisRef.current.stop();
        window.scrollTo(0, 0);
        setScrollProgress(0);
      }
    }
  }, [isReadyToEnter]);

  // Jump smoothly to a specific progress (0.0 to 1.0)
  const scrollToProgress = useCallback((targetProgress: number) => {
    if (!isReadyToEnterRef.current || !triggerRef.current) return;
    const total = triggerRef.current.offsetHeight - window.innerHeight;
    const targetY = triggerRef.current.offsetTop + targetProgress * total;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  // Handle smooth wheel events forwarded from inside monitor screen
  const handleMonitorScrollDelta = useCallback((deltaY: number) => {
    if (!isReadyToEnterRef.current) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(window.scrollY + deltaY, {
        immediate: false,
        duration: 0.35,
      });
    } else {
      window.scrollBy({ top: deltaY, behavior: "auto" });
    }
  }, []);

  // 1. Initialize Lenis & ScrollTrigger ONCE on mount (clean single source of scroll truth)
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    // Initially stop Lenis if not ready to enter
    if (!isReadyToEnterRef.current) {
      lenis.stop();
    }

    // Connect Lenis to ScrollTrigger updates
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger is the sole authoritative writer of scrollProgress
    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.25,
      onUpdate: (self) => {
        if (isReadyToEnterRef.current) {
          setScrollProgress(self.progress);
        } else {
          setScrollProgress(0);
        }
      },
    });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // Keyboard navigation listener (ArrowDown, ArrowUp, Space, PageDown, PageUp)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isReadyToEnterRef.current) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const step = 0.08;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        setScrollProgress((prev) => {
          const next = Math.min(1, prev + step);
          scrollToProgress(next);
          return next;
        });
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        setScrollProgress((prev) => {
          const next = Math.max(0, prev - step);
          scrollToProgress(next);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      trigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollToProgress]);

  const accentColor = profile.archetype.visualProfile.accent;

  // Cinematic Spatial Camera & Pacing Calculations (800vh total scroll distance):
  // 1. Door opening & glow: 0.00 -> 0.14
  // 2. Doorway traversal into chamber: 0.08 -> 0.18
  // 3. Wide studio room full revelation: 0.14 -> 0.28 (User is in the spacious chamber)
  // 4. Majestic camera glide onto master monitor: 0.28 -> 0.44 (Zoom from 0.42 to 1.0)
  const effectiveProgress = isReadyToEnter ? scrollProgress : 0;
  const doorProgress = Math.min(1, Math.max(0, effectiveProgress / 0.14));
  const doorEntryProgress = Math.min(1, Math.max(0, (effectiveProgress - 0.08) / 0.10));
  const roomEnterProgress = Math.min(1, Math.max(0, (effectiveProgress - 0.14) / 0.14));
  const monitorZoomProgress = Math.min(1, Math.max(0, (effectiveProgress - 0.28) / 0.16));

  // Determine current active scene for progress pill (1 to 9)
  let currentScene = 1;
  let sceneName = "ENTRY";
  let activeSceneKey = "door";

  if (effectiveProgress < 0.18) {
    currentScene = 1;
    sceneName = "スタジオの扉 // STUDIO DOOR";
    activeSceneKey = "door";
  } else if (effectiveProgress < 0.44) {
    currentScene = 2;
    sceneName = "システム起動 // SYSTEM BOOT";
    activeSceneKey = "boot";
  } else if (effectiveProgress < 0.54) {
    currentScene = 3;
    sceneName = "音響宇宙 // LISTENING UNIVERSE";
    activeSceneKey = "universe";
  } else if (effectiveProgress < 0.62) {
    currentScene = 4;
    sceneName = "ジャンル構成 // GENRE CURRENTS";
    activeSceneKey = "genres";
  } else if (effectiveProgress < 0.70) {
    currentScene = 5;
    sceneName = "アーティスト親和 // ARTIST AFFINITY";
    activeSceneKey = "artists";
  } else if (effectiveProgress < 0.78) {
    currentScene = 6;
    sceneName = "探求指数 // EXPLORATION";
    activeSceneKey = "exploration";
  } else if (effectiveProgress < 0.85) {
    currentScene = 7;
    sceneName = "時間的変遷 // PERIOD SHIFTS";
    activeSceneKey = "shifts";
  } else if (effectiveProgress < 0.91) {
    currentScene = 8;
    sceneName = "構造合成 // PROFILE SYNTHESIS";
    activeSceneKey = "radar";
  } else if (effectiveProgress < 0.975) {
    currentScene = 8;
    sceneName = "肖像顕現 // ARCHETYPE REVEAL";
    activeSceneKey = "reveal";
  } else {
    currentScene = 9;
    sceneName = "音楽的肖像 // IDENTITY DOSSIER";
    activeSceneKey = "summary";
  }

  const sceneProgressMap: Record<number, number> = {
    1: 0.0,
    2: 0.22,
    3: 0.46,
    4: 0.56,
    5: 0.64,
    6: 0.72,
    7: 0.80,
    8: 0.87,
    9: 0.98,
  };

  const handleRunAgain = () => {
    scrollToProgress(0);
  };

  // Contextual Chrome Visibility (Phase 6):
  // Hide UI chrome during Door walk-in (0 -> 0.18), Boot sequence (0.18 -> 0.44), and Archetype Reveal (0.91 -> 0.975)
  // Visible during active visual exploratory scenes and Final Summary
  const isChromeVisible =
    isReadyToEnter &&
    effectiveProgress >= 0.44 &&
    (effectiveProgress < 0.91 || effectiveProgress >= 0.975);

  const handlePrevScene = () => {
    const prevSceneNum = Math.max(1, currentScene - 1);
    scrollToProgress(sceneProgressMap[prevSceneNum]);
  };

  const handleNextScene = () => {
    const nextSceneNum = Math.min(9, currentScene + 1);
    scrollToProgress(sceneProgressMap[nextSceneNum]);
  };

  return (
    <div
      ref={triggerRef}
      className="relative w-full h-[800vh] bg-[#070709] text-white"
      style={
        {
          "--accent-color": accentColor,
          "--accent-glow": profile.archetype.visualProfile.accentGlow,
        } as React.CSSProperties
      }
    >
      {/* Pinned Viewport Container */}
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Minimal Progress Indicator (Contextual Auto-Hide) */}
        <div
          className="transition-opacity duration-500 z-40 pointer-events-none"
          style={{ opacity: isChromeVisible ? 1 : 0 }}
        >
          <ProgressIndicator
            currentScene={currentScene}
            totalScenes={9}
            sceneName={sceneName}
            accentColor={accentColor}
          />
        </div>

        {/* 1. Cinematic Studio Door Scene */}
        <StudioDoor
          doorProgress={doorProgress}
          doorEntryProgress={doorEntryProgress}
          accentColor={accentColor}
          isReadyToEnter={isReadyToEnter}
          analysisStep={analysisStep}
          analysisProgress={analysisProgress}
        />

        {/* 2. Studio Room & Master Monitor */}
        <StudioEnvironment
          roomEnterProgress={roomEnterProgress}
          monitorZoomProgress={monitorZoomProgress}
          activeSceneKey={activeSceneKey}
          visualProfile={profile.archetype.visualProfile}
          onScrollDelta={handleMonitorScrollDelta}
        >
          {/* Active Visual Scene on Monitor with AnimatePresence Transitions */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              {activeSceneKey === "boot" || effectiveProgress < 0.44 ? (
                <motion.div
                  key="boot"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <MonitorBoot
                    bootProgress={Math.min(
                      1,
                      Math.max(0, (effectiveProgress - 0.18) / 0.24)
                    )}
                    accentColor={accentColor}
                  />
                </motion.div>
              ) : activeSceneKey === "universe" ? (
                <motion.div
                  key="universe"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <UniverseView profile={profile} />
                </motion.div>
              ) : activeSceneKey === "genres" ? (
                <motion.div
                  key="genres"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <GenreVisualization
                    genreProfile={profile.genreProfile}
                    accentColor={accentColor}
                  />
                </motion.div>
              ) : activeSceneKey === "artists" ? (
                <motion.div
                  key="artists"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <ArtistVisualization
                    artistProfile={profile.artistProfile}
                    loyaltyScore={profile.loyaltyScore}
                    accentColor={accentColor}
                  />
                </motion.div>
              ) : activeSceneKey === "exploration" ? (
                <motion.div
                  key="exploration"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <ExplorationView profile={profile} accentColor={accentColor} />
                </motion.div>
              ) : activeSceneKey === "shifts" ? (
                <motion.div
                  key="shifts"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <PeriodComparisonView
                    comparison={profile.comparison}
                    recentChangeScore={profile.recentChangeScore}
                    accentColor={accentColor}
                  />
                </motion.div>
              ) : activeSceneKey === "radar" ? (
                <motion.div
                  key="radar"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <ProfileConstructionView
                    dimensions={profile.dimensions}
                    accentColor={accentColor}
                  />
                </motion.div>
              ) : activeSceneKey === "reveal" ? (
                <motion.div
                  key="reveal"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <ArchetypeRevealView
                    archetype={profile.archetype}
                    secondaryArchetype={profile.secondaryArchetype}
                    stageProgress={Math.min(
                      1,
                      Math.max(0, (effectiveProgress - 0.91) / 0.065)
                    )}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <FinalSummaryView
                    profile={profile}
                    onAnalyzeAnother={onAnalyzeAnother}
                    onRunAgain={handleRunAgain}
                    onDisconnect={onDisconnect}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </StudioEnvironment>

        {/* Interactive Scene Navigation Controls (Contextual Auto-Hide) */}
        <div
          className="fixed bottom-4 inset-x-0 sm:inset-x-auto sm:bottom-6 sm:left-8 z-40 flex items-center justify-center sm:justify-start gap-2 px-4 transition-opacity duration-500"
          style={{
            opacity: isChromeVisible ? 1 : 0,
            pointerEvents: isChromeVisible ? "auto" : "none",
          }}
        >
          <button
            onClick={handlePrevScene}
            disabled={currentScene <= 1}
            className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-white/80 hover:text-white text-xs font-mono backdrop-blur-md cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xl hover:border-white/40"
            title="Previous Chapter"
          >
            ← PREV
          </button>

          {/* Interactive Scene Dots */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 border border-white/15 backdrop-blur-md shadow-xl">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
              <button
                key={s}
                onClick={() => scrollToProgress(sceneProgressMap[s])}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentScene === s
                    ? "w-5 bg-white"
                    : "w-2 bg-white/25 hover:bg-white/60"
                }`}
                style={
                  currentScene === s ? { backgroundColor: accentColor } : {}
                }
                title={`Jump to Scene ${s}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextScene}
            disabled={currentScene >= 9}
            className="px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 text-white hover:text-white text-xs font-mono backdrop-blur-md cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xl hover:border-white/40 font-semibold"
            title="Next Chapter"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
};
