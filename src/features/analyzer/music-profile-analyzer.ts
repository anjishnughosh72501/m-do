import {
  ArtistRecord,
  ComparisonProfile,
  ListeningDataset,
  MusicDimensions,
  MusicProfile,
} from "@/types";
import { analyzeGenres } from "./genre-analyzer";
import { analyzeArtists } from "./artist-analyzer";
import { analyzeTracks } from "./track-analyzer";
import { calculateExplorationScore } from "./exploration-score";
import { calculateLoyaltyScore } from "./loyalty-score";
import { detectPeriodShifts } from "./change-detector";
import { classifyArchetype } from "./archetype-classifier";
import { generateInsights } from "./templates";

/**
 * Main Pure Analyzer API
 * Computes deterministic listening profile and archetype without external services.
 */
export function analyzeMusic(
  dataset: ListeningDataset,
  comparisonDataset?: ListeningDataset
): MusicProfile {
  // 1. Analyze Core Dimensions
  const genreProfile = analyzeGenres(dataset.topArtists);
  const artistProfile = analyzeArtists(dataset.topArtists, dataset.topTracks);
  const trackProfile = analyzeTracks(dataset.topTracks);

  // 2. Temporal Comparison / Recent Change Detection
  let comparison: ComparisonProfile | undefined;
  let recentChange = 30; // sensible baseline

  if (comparisonDataset && comparisonDataset.topArtists.length > 0) {
    comparison = detectPeriodShifts(
      dataset.topArtists,
      dataset.range,
      comparisonDataset.topArtists,
      comparisonDataset.range
    );
    recentChange = comparison.divergenceScore;
  } else if (dataset.recentlyPlayed && dataset.recentlyPlayed.length > 0) {
    // If no secondary period comparison is provided, compare recentlyPlayed vs topTracks as a proxy
    const recentArtistNames = new Set(
      dataset.recentlyPlayed.flatMap((t) => t.artistNames)
    );
    const topArtistNames = new Set(dataset.topArtists.map((a) => a.name));

    let overlap = 0;
    for (const name of Array.from(recentArtistNames)) {
      if (topArtistNames.has(name)) {
        overlap += 1;
      }
    }
    const overlapRatio = recentArtistNames.size > 0 ? overlap / recentArtistNames.size : 0.5;
    // Lower overlap between recent playback and all-time top items means higher recent change
    recentChange = Math.min(100, Math.max(10, Math.round((1 - overlapRatio) * 100)));
  }

  // 3. Synthesize Music Dimensions
  const genreDiversity = genreProfile.genreDiversity;
  const artistDiversity = artistProfile.artistDiversity;
  const catalogDiversity = trackProfile.catalogDiversity;

  const explorationScore = calculateExplorationScore(
    genreDiversity,
    artistDiversity,
    catalogDiversity,
    recentChange
  );

  const loyaltyScore = calculateLoyaltyScore(
    artistProfile.topArtistShare,
    artistProfile.top5Share,
    genreProfile.dominantGenre.percentage
  );

  // Consistency reflects sustained listening patterns without erratic shifts
  const listeningConsistency = Math.min(
    100,
    Math.max(0, Math.round(loyaltyScore * 0.6 + (100 - recentChange) * 0.4))
  );

  const dimensions: MusicDimensions = {
    exploration: explorationScore,
    loyalty: loyaltyScore,
    genreDiversity,
    artistDiversity,
    recentChange,
    catalogDiversity,
    listeningConsistency,
  };

  // 4. Classify Archetype
  const { primary, secondary } = classifyArchetype(dimensions);

  // 5. Generate Editorial Phrasing
  const insights = generateInsights(
    dimensions,
    genreProfile,
    artistProfile,
    trackProfile,
    primary,
    secondary
  );

  return {
    timeRange: dataset.range,
    datasetSize: {
      artists: dataset.topArtists.length,
      tracks: dataset.topTracks.length,
      genres: genreProfile.genreCount,
    },
    dimensions,
    genreProfile,
    artistProfile,
    trackProfile,
    explorationScore,
    loyaltyScore,
    recentChangeScore: recentChange,
    archetype: primary,
    secondaryArchetype: secondary,
    comparison,
    insights,
  };
}
