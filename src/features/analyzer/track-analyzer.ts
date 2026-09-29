import { TrackProfile, TrackRecord } from "@/types";

/**
 * TrackAnalyzer
 * Computes catalog breadth, track uniqueness, and duration statistics.
 *
 * Complexity: O(T) where T is track count.
 */
export function analyzeTracks(tracks: TrackRecord[]): TrackProfile {
  if (tracks.length === 0) {
    return {
      uniqueTrackCount: 0,
      catalogDiversity: 50,
      averageDurationMs: 0,
    };
  }

  // Count unique track IDs
  const uniqueIds = new Set(tracks.map((t) => t.id));
  const uniqueTrackCount = uniqueIds.size;

  // Count distinct albums
  const uniqueAlbums = new Set(
    tracks.map((t) => t.albumName).filter((name): name is string => Boolean(name))
  );

  // Compute Catalog Diversity (0 - 100)
  // Higher album-to-track ratio and unique artist count yields higher catalog diversity
  const albumRatio = tracks.length > 0 ? uniqueAlbums.size / tracks.length : 1;
  const uniqueRatio = tracks.length > 0 ? uniqueTrackCount / tracks.length : 1;
  const catalogDiversity = Math.min(
    100,
    Math.max(0, Math.round((albumRatio * 0.5 + uniqueRatio * 0.5) * 100))
  );

  // Duration stats
  let totalDuration = 0;
  let durationCount = 0;
  let shortestTrack: TrackRecord | undefined;
  let longestTrack: TrackRecord | undefined;

  for (const track of tracks) {
    if (track.durationMs && track.durationMs > 0) {
      totalDuration += track.durationMs;
      durationCount += 1;

      if (!shortestTrack || track.durationMs < (shortestTrack.durationMs || Infinity)) {
        shortestTrack = track;
      }
      if (!longestTrack || track.durationMs > (longestTrack.durationMs || 0)) {
        longestTrack = track;
      }
    }
  }

  const averageDurationMs = durationCount > 0 ? Math.round(totalDuration / durationCount) : 0;

  return {
    uniqueTrackCount,
    catalogDiversity,
    averageDurationMs,
    shortestTrack,
    longestTrack,
  };
}
