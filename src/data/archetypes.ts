import { MusicArchetype } from "@/types";

export const ARCHETYPES: Record<string, MusicArchetype> = {
  EXPLORER: {
    id: "EXPLORER",
    title: "THE EXPLORER",
    subtitle: "Endless Horizons & Boundary Crosser",
    description:
      "You rarely stay in one musical lane. Your library is a living transit map of genres, discovering artists across disparate scenes and rejecting sonic borders.",
    strengths: [
      "Exceptional genre breadth across distant sonic territories",
      "High curiosity ratio with constant rotation of emerging artists",
      "Resistance to repetitive listening traps or fixed playlists",
    ],
    visualProfile: {
      accent: "#38bdf8", // Sky / Cyan
      secondaryAccent: "#a855f7", // Violet
      accentGlow: "rgba(56, 189, 248, 0.4)",
      particleSpeed: 1.4,
      glowIntensity: 0.85,
      backgroundStyle: "aurora",
      studioImage: "/studios/studio-explorer.png",
      energy: 78,
      calm: 45,
      nightAffinity: 55,
    },
  },
  ANCHOR: {
    id: "ANCHOR",
    title: "THE ANCHOR",
    subtitle: "Devoted Core & Deep Resonance",
    description:
      "You build deep, lasting relationships with the artists you love. Rather than skimming surfaces, you dive deeply into discographies, treating records as faithful companions.",
    strengths: [
      "Unmatched loyalty and repeat commitment to favorite discographies",
      "High emotional attachment and thematic consistency in sessions",
      "Immunity to short-lived musical fads or algorithmic churn",
    ],
    visualProfile: {
      accent: "#3b82f6", // Royal Blue
      secondaryAccent: "#1d4ed8", // Deep Blue
      accentGlow: "rgba(59, 130, 246, 0.45)",
      particleSpeed: 0.4,
      glowIntensity: 0.7,
      backgroundStyle: "deep-drift",
      studioImage: "/studios/studio-anchor.png",
      energy: 42,
      calm: 86,
      nightAffinity: 60,
    },
  },
  NOMAD: {
    id: "NOMAD",
    title: "THE NOMAD",
    subtitle: "Rapid Evolution & Shifting Seasons",
    description:
      "Your musical identity is continually reinventing itself. Your recent listening reveals sharp evolutions from your past, moving between sound worlds as your seasons change.",
    strengths: [
      "Dynamic listening phases that adapt to personal growth",
      "Bold seasonal shifts between completely different sound palettes",
      "Fast adoption of new rhythms and emotional landscapes",
    ],
    visualProfile: {
      accent: "#f97316", // Vibrant Orange
      secondaryAccent: "#ec4899", // Pink
      accentGlow: "rgba(249, 115, 22, 0.45)",
      particleSpeed: 1.6,
      glowIntensity: 0.9,
      backgroundStyle: "radial",
      studioImage: "/studios/studio-after-hours.png",
      energy: 84,
      calm: 35,
      nightAffinity: 50,
    },
  },
  AFTER_HOURS: {
    id: "AFTER_HOURS",
    title: "THE AFTER-HOURS",
    subtitle: "Nocturnal Pulse & Atmospheric Submersion",
    description:
      "Your listening gravitates to the quiet hours. You seek enveloping soundscapes, hypnotic rhythms, and textured arrangements that thrive when the world sleeps.",
    strengths: [
      "Subtle appreciation for production textures and spatial depth",
      "Curated sanctuary listening suited for deep focus and stillness",
      "Gravitation toward hypnotic downtempo, ambient, and moody electronics",
    ],
    visualProfile: {
      accent: "#8b5cf6", // Violet / Iris
      secondaryAccent: "#06b6d4", // Cyan
      accentGlow: "rgba(139, 92, 246, 0.45)",
      particleSpeed: 0.5,
      glowIntensity: 0.75,
      backgroundStyle: "nebula",
      studioImage: "/studios/studio-after-hours.png",
      energy: 48,
      calm: 78,
      nightAffinity: 92,
    },
  },
  ECLECTIC: {
    id: "ECLECTIC",
    title: "THE ECLECTIC",
    subtitle: "Polymorphic Taste & Omnivorous Curiosity",
    description:
      "You find brilliance across every genre family without prejudice. Your rotation effortlessly balances contrasting sounds, finding invisible threads that connect them all.",
    strengths: [
      "Near-perfect entropy across multiple distinct genre families",
      "Refusal to be pigeonholed by single-genre subcultures",
      "Uncommon ability to transition between contrasting emotional frequencies",
    ],
    visualProfile: {
      accent: "#10b981", // Emerald
      secondaryAccent: "#6366f1", // Indigo
      accentGlow: "rgba(16, 185, 129, 0.45)",
      particleSpeed: 1.1,
      glowIntensity: 0.8,
      backgroundStyle: "mesh",
      studioImage: "/studios/studio-explorer.png",
      energy: 65,
      calm: 60,
      nightAffinity: 58,
    },
  },
  FOCUSED: {
    id: "FOCUSED",
    title: "THE FOCUSED",
    subtitle: "Architectural Intent & Pure Cohesion",
    description:
      "You treat music as an engine of clarity. Your listening habits are defined by disciplined sonic continuity, favoring cohesive sonic signatures that maintain momentum.",
    strengths: [
      "Exceptional listening consistency without jarring interruptions",
      "Purpose-driven sound environments calibrated for flow states",
      "High precision in artist and genre affinity selection",
    ],
    visualProfile: {
      accent: "#06b6d4", // Electric Cyan
      secondaryAccent: "#3b82f6", // Blue
      accentGlow: "rgba(6, 182, 212, 0.4)",
      particleSpeed: 0.7,
      glowIntensity: 0.7,
      backgroundStyle: "radial",
      studioImage: "/studios/studio-minimal.png",
      energy: 55,
      calm: 75,
      nightAffinity: 65,
    },
  },
  ROMANTIC: {
    id: "ROMANTIC",
    title: "THE ROMANTIC",
    subtitle: "Lyrical Depth & Emotive Architecture",
    description:
      "You listen for heart and narrative. Melody, poetic lyricism, and poignant harmonic progressions take center stage, anchoring memories to specific compositions.",
    strengths: [
      "Deep resonance with vocal storytelling and expressive instrumentation",
      "Enduring attachment to songs that evoke vivid personal milestones",
      "Sensitivity to emotional nuance in songwriting and performance",
    ],
    visualProfile: {
      accent: "#f43f5e", // Rose
      secondaryAccent: "#fb923c", // Warm Peach
      accentGlow: "rgba(244, 63, 94, 0.45)",
      particleSpeed: 0.8,
      glowIntensity: 0.82,
      backgroundStyle: "aurora",
      studioImage: "/studios/studio-anchor.png",
      energy: 62,
      calm: 68,
      nightAffinity: 62,
    },
  },
  WANDERER: {
    id: "WANDERER",
    title: "THE WANDERER",
    subtitle: "Uncharted Drift & Boundless Solitude",
    description:
      "You let music guide you rather than guiding the playlist. You drift through vast catalogs with spontaneous intuition, finding wonder in hidden B-sides and unhurried passages.",
    strengths: [
      "High catalog diversity with low repetition fatigue",
      "Intuitive navigation of catalog depths and unexpected recordings",
      "Openness to spacious compositions and unstructured arrangements",
    ],
    visualProfile: {
      accent: "#ec4899", // Magenta / Pink
      secondaryAccent: "#8b5cf6", // Violet
      accentGlow: "rgba(236, 72, 153, 0.4)",
      particleSpeed: 1.0,
      glowIntensity: 0.8,
      backgroundStyle: "mesh",
      studioImage: "/studios/studio-minimal.png",
      energy: 60,
      calm: 70,
      nightAffinity: 70,
    },
  },
};
