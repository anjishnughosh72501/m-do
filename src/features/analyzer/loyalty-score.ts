import { LOYALTY_WEIGHTS } from "@/data/weights";

/**
 * LoyaltyScoreCalculator
 * Measures listening loyalty and repeat affinity based on concentration around
 * top artists and core genres.
 *
 * Range: [0, 100]
 */
export function calculateLoyaltyScore(
  topArtistShare: number,
  top5Share: number,
  dominantGenrePercentage: number
): number {
  // Normalize top artist share (10% to 50%+ maps to 0-100)
  const normTopArtist = Math.min(100, Math.max(0, (topArtistShare / 30) * 100));
  // Normalize top 5 share (20% to 75%+ maps to 0-100)
  const normTop5 = Math.min(100, Math.max(0, (top5Share / 65) * 100));
  // Normalize dominant genre (15% to 60%+ maps to 0-100)
  const normGenre = Math.min(100, Math.max(0, (dominantGenrePercentage / 50) * 100));

  const score =
    normTopArtist * LOYALTY_WEIGHTS.topArtistConcentration +
    normTop5 * LOYALTY_WEIGHTS.top5Concentration +
    normGenre * LOYALTY_WEIGHTS.genreDominance;

  return Math.min(100, Math.max(0, Math.round(score)));
}
