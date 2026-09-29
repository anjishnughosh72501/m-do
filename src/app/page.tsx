"use client";

import React, { useEffect, useState } from "react";
import {
  ListeningDataset,
  MusicProfile,
  SpotifyUserProfile,
  TimeRange,
} from "@/types";
import { DEMO_PERSONAS, DemoPersona } from "@/data/demo-data";
import { analyzeMusic } from "@/features/analyzer/music-profile-analyzer";
import {
  disconnectSpotify,
  getSpotifyClientId,
  getStoredAccessToken,
  redirectToSpotifyAuth,
} from "@/features/spotify/auth";
import {
  fetchCurrentUser,
  fetchListeningDataset,
} from "@/features/spotify/client";
import { LandingView } from "@/components/studio/LandingView";
import { RangeSelectorView } from "@/components/studio/RangeSelectorView";
import { StudioTimeline } from "@/components/studio/StudioTimeline";
import { PrivacyModal } from "@/components/PrivacyModal";
import { DemoPersonaSelector } from "@/components/studio/DemoPersonaSelector";

export default function Home() {
  const [view, setView] = useState<"landing" | "range" | "studio">("landing");
  const [profile, setProfile] = useState<MusicProfile | null>(null);
  const [selectedRange, setSelectedRange] = useState<TimeRange>("short_term");
  const [user, setUser] = useState<SpotifyUserProfile | null>(null);

  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [activePersona, setActivePersona] = useState<DemoPersona>(
    DEMO_PERSONAS.explorer
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isDemoSelectorOpen, setIsDemoSelectorOpen] = useState<boolean>(false);

  // Door analysis lock states
  const [isReadyToEnter, setIsReadyToEnter] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>(
    "Connecting to listening profile..."
  );
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  // Check for active Spotify session on initial mount
  useEffect(() => {
    const token = getStoredAccessToken();
    if (token) {
      setIsLoading(true);
      fetchCurrentUser()
        .then((u) => {
          setUser(u);
          setIsDemoMode(false);
          setView("range");
        })
        .catch((err) => {
          console.warn("Failed to load existing Spotify user:", err);
          disconnectSpotify();
          setView("landing");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  // Spotify Authentication Click
  const handleContinueSpotify = async () => {
    setErrorMessage(null);
    const clientId = getSpotifyClientId();
    if (!clientId) {
      setErrorMessage(
        "Spotify Client ID is not configured. Set NEXT_PUBLIC_SPOTIFY_CLIENT_ID in .env.local, or click 'Try Demo' below to explore instantly with realistic synthetic data."
      );
      return;
    }

    try {
      setIsLoading(true);
      await redirectToSpotifyAuth();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to initiate Spotify connection."
      );
    }
  };

  // Demo Persona Selection Click
  const handleSelectDemoPersona = (persona: DemoPersona) => {
    setIsDemoSelectorOpen(false);
    setIsDemoMode(true);
    setActivePersona(persona);
    setUser({
      id: `demo-${persona.id}`,
      displayName: persona.name,
    });
    setView("range");
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Start Analysis for chosen range (and optional period comparison)
  const handleSelectRange = async (
    range: TimeRange,
    compareWith?: TimeRange
  ) => {
    setSelectedRange(range);
    setIsLoading(true);
    setErrorMessage(null);
    setIsReadyToEnter(false);
    setAnalysisProgress(15);
    setAnalysisStep("Connecting to listening data stream...");

    // Immediately navigate to hallway in front of the door
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // Set default fallback profile for rendering while analyzing
    const initialDataset = isDemoMode
      ? activePersona.datasets[range]
      : DEMO_PERSONAS.explorer.datasets[range];
    const preliminaryProfile = analyzeMusic(initialDataset);
    setProfile(preliminaryProfile);
    setView("studio");

    try {
      setAnalysisProgress(30);
      setAnalysisStep("Fetching top tracks and artist affinities...");

      let currentDataset: ListeningDataset;
      let compareDataset: ListeningDataset | undefined;

      if (isDemoMode) {
        currentDataset = activePersona.datasets[range];
        if (compareWith) {
          compareDataset = activePersona.datasets[compareWith];
        }
        await delay(500);
      } else {
        currentDataset = await fetchListeningDataset(range);
        if (compareWith) {
          compareDataset = await fetchListeningDataset(compareWith);
        }
      }

      setAnalysisProgress(60);
      setAnalysisStep("Computing Shannon entropy & mapping genre families...");
      await delay(500);

      setAnalysisProgress(85);
      setAnalysisStep("Distilling music archetype & calibrating studio...");
      const analyzedProfile = analyzeMusic(currentDataset, compareDataset);
      setProfile(analyzedProfile);
      await delay(500);

      setAnalysisProgress(100);
      setAnalysisStep("Analysis complete • Access granted!");
      await delay(400);

      // Unlock the door for entry
      setIsReadyToEnter(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to collect and analyze music profile. Please try again."
      );
      setView("range");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setIsReadyToEnter(false);
    setView("range");
  };

  const handleDisconnect = () => {
    disconnectSpotify();
    setUser(null);
    setProfile(null);
    setIsDemoMode(false);
    setIsReadyToEnter(false);
    setView("landing");
  };

  return (
    <main className="w-full bg-[#080808] text-white">
      {/* 1. Landing View */}
      {view === "landing" && (
        <LandingView
          onContinueSpotify={handleContinueSpotify}
          onTryDemo={() => setIsDemoSelectorOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}

      {/* 2. Range Selector View */}
      {view === "range" && (
        <RangeSelectorView
          userName={user?.displayName || "Listener"}
          onSelectRange={handleSelectRange}
          isLoading={isLoading}
        />
      )}

      {/* 3. The Cinematic Scroll Studio Chamber */}
      {view === "studio" && profile && (
        <StudioTimeline
          profile={profile}
          timeRange={selectedRange}
          isReadyToEnter={isReadyToEnter}
          analysisStep={analysisStep}
          analysisProgress={analysisProgress}
          onAnalyzeAnother={handleAnalyzeAnother}
          onDisconnect={handleDisconnect}
        />
      )}

      {/* Privacy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Demo Persona Selector Modal */}
      <DemoPersonaSelector
        isOpen={isDemoSelectorOpen}
        onClose={() => setIsDemoSelectorOpen(false)}
        onSelectPersona={handleSelectDemoPersona}
      />
    </main>
  );
}
