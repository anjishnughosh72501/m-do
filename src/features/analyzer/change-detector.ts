import {
  ArtistRecord,
  ComparisonProfile,
  GenreFamily,
  GenreShift,
  TimeRange,
} from "@/types";
import { GENRE_FAMILY_DISPLAY_NAMES } from "@/data/genre-map";
import { analyzeGenres } from "./genre-analyzer";

/**
 * ChangeDetector
 * Measures temporal listening shifts between distinct Spotify time ranges
 * (e.g. 4 WEEKS vs 1 YEAR).
 *
 * Algorithm:
 * - Computes normalized genre distributions for both periods.
 * - Calculates Total Variation Distance (TVD):
 *   TVD(P, Q) = 0.5 * Σ |P_i - Q_i|
 *   Since Σ P_i = 1 and Σ Q_i = 1, TVD lies in [0, 1].
 *   Divergence Score = TVD * 100
 * - Identifies surging and declining genres.
 *
 * Complexity: O(A) where A is artist count.
 */
export function detectPeriodShifts(
  currentArtists: ArtistRecord[],
  currentRange: TimeRange,
  previousArtists: ArtistRecord[],
  previousRange: TimeRange
): ComparisonProfile {
  const currentProfile = analyzeGenres(currentArtists);
  const prevProfile = analyzeGenres(previousArtists);

  const prevMap = new Map<GenreFamily, number>();
  for (const s of prevProfile.allFamilies) {
    prevMap.set(s.family, s.percentage);
  }

  const currMap = new Map<GenreFamily, number>();
  for (const s of currentProfile.allFamilies) {
    currMap.set(s.family, s.percentage);
  }

  // Union of all families present in either
  const allFamilies = new Set<GenreFamily>([
    ...Array.from(prevMap.keys()),
    ...Array.from(currMap.keys()),
  ]);

  const shifts: GenreShift[] = [];
  let totalAbsoluteDelta = 0;

  for (const family of Array.from(allFamilies)) {
    const prevPct = prevMap.get(family) || 0;
    const currPct = currMap.get(family) || 0;
    const delta = currPct - prevPct;

    totalAbsoluteDelta += Math.abs(currPct - prevPct);

    // Only include noticeable shifts (at least 2% or active in top)
    if (prevPct > 3 || currPct > 3 || Math.abs(delta) >= 3) {
      shifts.push({
        family,
        displayName: GENRE_FAMILY_DISPLAY_NAMES[family] || family,
        previousPercentage: prevPct,
        currentPercentage: currPct,
        delta,
      });
    }
  }

  // Sort shifts by magnitude of change descending
  shifts.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  // TVD score: (0.5 * sum(|p - q|)) as percentage
  // Since percentages sum to ~100, sum(|curr - prev|) max is ~200.
  const divergenceScore = Math.min(
    100,
    Math.max(0, Math.round((totalAbsoluteDelta / 200) * 100))
  );

  // Dynamic narrative generation
  const largestGain = shifts.find((s) => s.delta > 0);
  const largestDrop = shifts.find((s) => s.delta < 0);

  let headline = "YOUR SOUND IS CONSISTENT";
  let narrative = "Your listening foundation has remained steady across these time periods.";

  if (divergenceScore >= 60) {
    headline = "YOUR SOUND IS SHIFTING DRAMATICALLY";
    if (largestGain) {
      narrative = `${largestGain.displayName} surged by +${largestGain.delta}% in your recent rotation, transforming your sonic landscape.`;
    } else {
      narrative = "Your recent rotation has evolved significantly from your historical baseline.";
    }
  } else if (divergenceScore >= 30) {
    headline = "YOUR SOUND IS EVOLVING";
    if (largestGain && largestDrop) {
      narrative = `${largestGain.displayName} (+${largestGain.delta}%) is taking space previously held by ${largestDrop.displayName} (${largestDrop.delta}%).`;
    } else if (largestGain) {
      narrative = `You've been leaning more into ${largestGain.displayName} (+${largestGain.delta}%) recently.`;
    }
  }

  return {
    baseRange: currentRange,
    targetRange: previousRange,
    shifts: shifts.slice(0, 5),
    divergenceScore,
    headline,
    narrative,
  };
}
