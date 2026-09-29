import { EXPLORATION_WEIGHTS } from "@/data/weights";

/**
 * ExplorationScoreCalculator
 * Deterministic scoring engine for the user's exploratory curiosity.
 *
 * Formula:
 * Exploration = genreDiversity * 0.35
 *             + artistDiversity * 0.35
 *             + catalogDiversity * 0.15
 *             + recentChange * 0.15
 *
 * Range: [0, 100]
 */
export function calculateExplorationScore(
  genreDiversity: number,
  artistDiversity: number,
  catalogDiversity: number,
  recentChange: number
): number {
  const score =
    genreDiversity * EXPLORATION_WEIGHTS.genreDiversity +
    artistDiversity * EXPLORATION_WEIGHTS.artistDiversity +
    catalogDiversity * EXPLORATION_WEIGHTS.catalogDiversity +
    recentChange * EXPLORATION_WEIGHTS.recentChange;

  return Math.min(100, Math.max(0, Math.round(score)));
}
