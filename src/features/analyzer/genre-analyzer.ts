import { ArtistRecord, GenreFamily, GenreProfile, GenreShare } from "@/types";
import { GENRE_FAMILY_DISPLAY_NAMES, mapGenreToFamily } from "@/data/genre-map";
import {
  calculateNormalizedConcentration,
  calculateNormalizedEntropy,
} from "./diversity-calculator";

/**
 * GenreAnalyzer
 * Extracts and normalizes artist genres into structured family distributions.
 *
 * Computational Complexity:
 * - Aggregation: O(A * G) where A is artist count (~50) and G is average genres per artist (~3) => ~150 ops.
 * - Sorting: O(K log K) where K is unique families (<= 16) => negligible.
 * - Space: O(K) in HashMap.
 */
export function analyzeGenres(artists: ArtistRecord[]): GenreProfile {
  const familyCounts = new Map<GenreFamily, { count: number; rawGenres: Set<string> }>();

  // Initialize map with 0 counts
  const allFamilies = Object.keys(GENRE_FAMILY_DISPLAY_NAMES) as GenreFamily[];
  for (const family of allFamilies) {
    familyCounts.set(family, { count: 0, rawGenres: new Set<string>() });
  }

  let totalGenreHits = 0;

  for (const artist of artists) {
    if (!artist.genres || artist.genres.length === 0) {
      // If artist has no genres specified, map to OTHER with 1 hit
      const entry = familyCounts.get("OTHER")!;
      entry.count += 1;
      entry.rawGenres.add("unclassified");
      totalGenreHits += 1;
      continue;
    }

    for (const rawGenre of artist.genres) {
      const family = mapGenreToFamily(rawGenre);
      const entry = familyCounts.get(family)!;
      entry.count += 1;
      entry.rawGenres.add(rawGenre);
      totalGenreHits += 1;
    }
  }

  if (totalGenreHits === 0) {
    totalGenreHits = 1; // Guard against divide-by-zero
  }

  // Build sorted list of active genre families
  const genreShares: GenreShare[] = [];
  const countsForEntropy: number[] = [];

  for (const [family, { count, rawGenres }] of familyCounts.entries()) {
    if (count > 0) {
      const percentage = Math.round((count / totalGenreHits) * 100);
      genreShares.push({
        family,
        displayName: GENRE_FAMILY_DISPLAY_NAMES[family],
        count,
        percentage,
        rawGenres: Array.from(rawGenres),
      });
      countsForEntropy.push(count);
    }
  }

  // Sort descending by count
  genreShares.sort((a, b) => b.count - a.count);

  const fallbackDominant: GenreShare = {
    family: "OTHER",
    displayName: "Other Horizons",
    count: 1,
    percentage: 100,
    rawGenres: [],
  };

  const dominantGenre = genreShares[0] || fallbackDominant;
  const topGenres = genreShares.slice(0, 5);

  const genreEntropy = calculateNormalizedEntropy(countsForEntropy);
  const genreConcentration = calculateNormalizedConcentration(countsForEntropy);

  return {
    genreCount: genreShares.length,
    dominantGenre,
    topGenres,
    genreEntropy,
    genreConcentration,
    genreDiversity: genreEntropy, // Direct mapping of Shannon entropy
    allFamilies: genreShares,
  };
}
