import {
  ArtistProfile,
  GenreProfile,
  MusicArchetype,
  MusicDimensions,
  TrackProfile,
} from "@/types";

/**
 * Editorial insight generator based on deterministic thresholds.
 * Zero external LLM calls or predictive ML hallucination.
 */
export function generateInsights(
  dimensions: MusicDimensions,
  genres: GenreProfile,
  artists: ArtistProfile,
  tracks: TrackProfile,
  archetype: MusicArchetype,
  secondaryArchetype?: MusicArchetype
): {
  headline: string;
  universeNote: string;
  explorationNote: string;
  patternNote: string;
  summaryNote: string;
} {
  // Exploration note
  let explorationNote = "";
  if (dimensions.exploration >= 80) {
    explorationNote =
      "You rarely stay in one musical lane. Your rotation moves freely across disparate scenes, prioritizing discovery over habit.";
  } else if (dimensions.exploration >= 55) {
    explorationNote =
      "You balance familiar favorites with steady curiosity, branching into new territory while keeping reliable anchors.";
  } else {
    explorationNote =
      "You value deep familiarity. When you connect with a sound, you return to it consistently rather than chasing fleeting shifts.";
  }

  // Universe note
  const dominantName = genres.dominantGenre.displayName;
  const dominantPct = genres.dominantGenre.percentage;
  const artistCount = artists.artistCount;
  const genreCount = genres.genreCount;

  const universeNote = `Your sonic universe spans ${artistCount} distinct artists across ${genreCount} genre families, anchored predominantly by ${dominantName} (${dominantPct}%).`;

  // Pattern note
  let patternNote = "";
  if (dimensions.loyalty >= 70) {
    const topArtistName = artists.topArtist?.name || "your top artist";
    patternNote = `Your listening shows strong devotion to core creators. ${topArtistName} and your top 5 artists define the primary architecture of your queue.`;
  } else if (dimensions.genreDiversity >= 75) {
    patternNote =
      "Your genre distribution has exceptionally high entropy, meaning your time is spread equitably across diverse musical traditions.";
  } else if (dimensions.listeningConsistency >= 75) {
    patternNote =
      "Your listening shows steady sonic momentum. You sustain consistent moods and styles across long listening sessions.";
  } else {
    patternNote =
      "Your listening pattern reflects dynamic equilibrium—moving between concentrated favorites and wide-open exploration.";
  }

  // Summary note
  let summaryNote = "";
  if (secondaryArchetype) {
    summaryNote = `Your primary expression is ${archetype.title}, enriched with an unmistakable ${secondaryArchetype.title} influence.`;
  } else {
    summaryNote = `Your listening identity is distilled as ${archetype.title}: ${archetype.subtitle.toLowerCase()}.`;
  }

  // Headline
  let headline = "Your music tells a clear story.";
  if (dimensions.exploration >= 75) {
    headline = "Curiosity defines your sound.";
  } else if (dimensions.loyalty >= 75) {
    headline = "Devotion defines your sound.";
  } else if (dimensions.recentChange >= 70) {
    headline = "Your sound is actively transforming.";
  }

  return {
    headline,
    universeNote,
    explorationNote,
    patternNote,
    summaryNote,
  };
}
