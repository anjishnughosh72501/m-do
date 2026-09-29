"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSpotifyCallback } from "@/features/spotify/auth";
import { GlassButton } from "@/components/glass/GlassButton";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setErrorMessage(
        error === "access_denied"
          ? "Spotify authorization was cancelled. You can still experience EchoFlow via Demo Mode."
          : `Spotify authorization failed: ${error}`
      );
      return;
    }

    if (!code || !state) {
      setStatus("error");
      setErrorMessage("Missing authorization parameters. Please try again.");
      return;
    }

    handleSpotifyCallback(code, state)
      .then(() => {
        setStatus("success");
        // Redirect to main experience
        router.push("/");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during Spotify authentication."
        );
      });
  }, [router, searchParams]);

  return (
    <div className="w-full max-w-md p-8 rounded-2xl glass-panel text-center space-y-6 text-white font-sans">
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
          <div
            className={`w-4 h-4 rounded-full ${
              status === "error"
                ? "bg-rose-500"
                : status === "success"
                ? "bg-emerald-400"
                : "bg-cyan-400 animate-ping"
            }`}
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-light tracking-tight">
          {status === "processing"
            ? "CONNECTING TO SPOTIFY..."
            : status === "success"
            ? "CONNECTED SUCCESSFULLY"
            : "CONNECTION FAILED"}
        </h1>
        <p className="text-xs text-white/50 mt-2 font-mono">
          {status === "processing"
            ? "Exchanging PKCE cryptographic tokens with Spotify..."
            : status === "success"
            ? "Redirecting into your personal EchoFlow studio..."
            : errorMessage}
        </p>
      </div>

      {status === "error" && (
        <div className="pt-2">
          <GlassButton
            variant="primary"
            size="md"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Return to EchoFlow
          </GlassButton>
        </div>
      )}
    </div>
  );
}

export default function CallbackPage() {
  return (
    <main className="w-full h-[100dvh] bg-[#080808] flex items-center justify-center p-6">
      <Suspense
        fallback={
          <div className="text-white text-xs font-mono">
            INITIALIZING SECURE SESSION...
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </main>
  );
}
