import {
  ArtistRecord,
  ListeningDataset,
  SpotifyUserProfile,
  TimeRange,
  TrackRecord,
} from "@/types";
import { getStoredAccessToken } from "./auth";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// In-memory cache for the active session to avoid redundant network requests
const sessionCache = new Map<string, unknown>();

/**
 * Fetch wrapper with rate-limit handling and clear error boundaries.
 */
async function spotifyFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) {
    throw new Error("Your Spotify session has expired. Please reconnect your account.");
  }

  const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
  if (sessionCache.has(cacheKey)) {
    return sessionCache.get(cacheKey) as T;
  }

  const url = `${SPOTIFY_API_BASE}${endpoint}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Network connection error while reaching Spotify. Please check your connection.");
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After") || "5";
    throw new Error(
      `Spotify is asking us to slow down. Rate limit reached. Please wait ${retryAfter}s and try again.`
    );
  }

  if (response.status === 401) {
    throw new Error("Your Spotify session has expired. Please reconnect your account.");
  }

  if (response.status === 403) {
    throw new Error(
      "Spotify access restricted. In Developer Mode, only registered Spotify accounts can access this app."
    );
  }

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(
      errJson.error?.message ||
        `Spotify API encountered an error (HTTP ${response.status}). Please try again.`
    );
  }

  const data = (await response.json()) as T;
  sessionCache.set(cacheKey, data);
  return data;
}

/**
 * Retrieves the authenticated Spotify user profile.
 */
export async function fetchCurrentUser(): Promise<SpotifyUserProfile> {
  interface SpotifyMeResponse {
    id: string;
    display_name?: string;
    email?: string;
    images?: { url: string; height?: number; width?: number }[];
    country?: string;
  }

  const data = await spotifyFetch<SpotifyMeResponse>("/me");
  return {
    id: data.id,
    displayName: data.display_name || "Listener",
    email: data.email,
    images: data.images,
    country: data.country,
  };
}

/**
 * Fetches user's top tracks for a specific time range.
 */
export async function fetchTopTracks(range: TimeRange): Promise<TrackRecord[]> {
  interface SpotifyTopTracksResponse {
    items: {
      id: string;
      name: string;
      artists: { id: string; name: string }[];
      album?: { name: string };
      duration_ms: number;
      uri: string;
    }[];
  }

  const data = await spotifyFetch<SpotifyTopTracksResponse>(
    `/me/top/tracks?time_range=${range}&limit=50`
  );

  return (data.items || []).map((t) => ({
    id: t.id,
    name: t.name,
    artistIds: t.artists.map((a) => a.id),
    artistNames: t.artists.map((a) => a.name),
    albumName: t.album?.name,
    durationMs: t.duration_ms,
    uri: t.uri,
  }));
}

/**
 * Fetches user's top artists for a specific time range.
 */
export async function fetchTopArtists(range: TimeRange): Promise<ArtistRecord[]> {
  interface SpotifyTopArtistsResponse {
    items: {
      id: string;
      name: string;
      genres: string[];
      uri: string;
    }[];
  }

  const data = await spotifyFetch<SpotifyTopArtistsResponse>(
    `/me/top/artists?time_range=${range}&limit=50`
  );

  return (data.items || []).map((a) => ({
    id: a.id,
    name: a.name,
    genres: a.genres || [],
    uri: a.uri,
  }));
}

/**
 * Fetches recently played tracks as supplementary recent listening signal.
 */
export async function fetchRecentlyPlayed(): Promise<TrackRecord[]> {
  interface SpotifyRecentlyPlayedResponse {
    items: {
      track: {
        id: string;
        name: string;
        artists: { id: string; name: string }[];
        album?: { name: string };
        duration_ms: number;
        uri: string;
      };
    }[];
  }

  try {
    const data = await spotifyFetch<SpotifyRecentlyPlayedResponse>(
      "/me/player/recently-played?limit=50"
    );
    return (data.items || []).map((i) => ({
      id: i.track.id,
      name: i.track.name,
      artistIds: i.track.artists.map((a) => a.id),
      artistNames: i.track.artists.map((a) => a.name),
      albumName: i.track.album?.name,
      durationMs: i.track.duration_ms,
      uri: i.track.uri,
    }));
  } catch {
    // If recently played fails or has no permissions, gracefully return empty array
    return [];
  }
}

/**
 * Retrieves full ListeningDataset for a specific range.
 */
export async function fetchListeningDataset(range: TimeRange): Promise<ListeningDataset> {
  const [topTracks, topArtists, recentlyPlayed] = await Promise.all([
    fetchTopTracks(range),
    fetchTopArtists(range),
    fetchRecentlyPlayed(),
  ]);

  return {
    range,
    topTracks,
    topArtists,
    recentlyPlayed,
  };
}
