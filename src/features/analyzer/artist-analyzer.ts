import { ArtistProfile, ArtistRecord, TrackRecord } from "@/types";
import {
  calculateNormalizedConcentration,
  calculateNormalizedEntropy,
} from "./diversity-calculator";

/**
 * ArtistAnalyzer
 * Computes artist concentration, repeat loyalty, and diversity across top artists and tracks.
 *
 * Complexity:
 * - O(T + A) where T is track count (~50) and A is artist count (~50).
 */
export function analyzeArtists(
  artists: ArtistRecord[],
  tracks: TrackRecord[]
): ArtistProfile {
  if (artists.length === 0) {
    return {
      artistCount: 0,
      topArtist: null,
      top5Artists: [],
      topArtistShare: 0,
      top5Share: 0,
      artistDiversity: 50,
      artistConcentration: 0,
      repeatAffinity: 0,
    };
  }

  // Count track representation per artist
  const artistTrackCounts = new Map<string, number>();

  for (const track of tracks) {
    for (const artistName of track.artistNames) {
      artistTrackCounts.set(artistName, (artistTrackCounts.get(artistName) || 0) + 1);
    }
  }

  const totalTrackMentions = Math.max(
    1,
    Array.from(artistTrackCounts.values()).reduce((sum, count) => sum + count, 0)
  );

  const topArtist = artists[0] || null;
  const top5Artists = artists.slice(0, 5);

  // Calculate share of top artist and top 5
  const topArtistTrackCount = topArtist ? artistTrackCounts.get(topArtist.name) || 1 : 1;
  const topArtistShare = Math.round((topArtistTrackCount / totalTrackMentions) * 100);

  let top5Mentions = 0;
  for (const a of top5Artists) {
    top5Mentions += artistTrackCounts.get(a.name) || 1;
  }
  const top5Share = Math.min(100, Math.round((top5Mentions / totalTrackMentions) * 100));

  // Compute artist distribution diversity with catalog breadth scaling
  const countsArray = Array.from(artistTrackCounts.values());
  const entropy = calculateNormalizedEntropy(countsArray);
  const breadthScale = Math.min(1.0, artists.length / 10);
  const artistDiversity = Math.round(entropy * (0.3 + 0.7 * breadthScale));
  const artistConcentration = Math.max(0, 100 - artistDiversity);

  // Repeat affinity proxy: reflects how heavily the top 5 artists dominate the tracks
  // If top 5 artists account for > 60% of tracks, repeat affinity is very high
  const repeatAffinity = Math.min(100, Math.max(0, Math.round(top5Share * 1.1)));

  return {
    artistCount: artists.length,
    topArtist,
    top5Artists,
    topArtistShare,
    top5Share,
    artistDiversity,
    artistConcentration,
    repeatAffinity,
  };
}
