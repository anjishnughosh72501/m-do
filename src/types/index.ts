export type TimeRange = "short_term" | "medium_term" | "long_term";

export interface TrackRecord {
  id: string;
  name: string;
  artistIds: string[];
  artistNames: string[];
  albumName?: string;
  durationMs?: number;
  uri: string;
}

export interface ArtistRecord {
  id: string;
  name: string;
  genres: string[];
  uri: string;
}

export interface ListeningDataset {
  range: TimeRange;
  topTracks: TrackRecord[];
  topArtists: ArtistRecord[];
  recentlyPlayed: TrackRecord[];
}

export type GenreFamily =
  | "INDIE"
  | "POP"
  | "ROCK"
  | "ELECTRONIC"
  | "HIP_HOP"
  | "RNB"
  | "JAZZ"
  | "CLASSICAL"
  | "METAL"
  | "COUNTRY"
  | "LATIN"
  | "REGGAE"
  | "AMBIENT"
  | "FOLK"
  | "SOUL"
  | "OTHER";

export interface GenreShare {
  family: GenreFamily;
  displayName: string;
  count: number;
  percentage: number;
  rawGenres: string[];
}

export interface GenreProfile {
  genreCount: number;
  dominantGenre: GenreShare;
  topGenres: GenreShare[];
  genreEntropy: number; // Normalized 0 - 100
  genreConcentration: number; // 0 - 100 (HHI normalized)
  genreDiversity: number; // 0 - 100
  allFamilies: GenreShare[];
}

export interface ArtistProfile {
  artistCount: number;
  topArtist: ArtistRecord | null;
  top5Artists: ArtistRecord[];
  topArtistShare: number; // % of total artist mentions
  top5Share: number; // % of top 5 artist mentions
  artistDiversity: number; // 0 - 100
  artistConcentration: number; // 0 - 100
  repeatAffinity: number; // 0 - 100
}

export interface TrackProfile {
  uniqueTrackCount: number;
  catalogDiversity: number; // 0 - 100
  averageDurationMs: number;
  shortestTrack?: TrackRecord;
  longestTrack?: TrackRecord;
}

export interface GenreShift {
  family: GenreFamily;
  displayName: string;
  previousPercentage: number;
  currentPercentage: number;
  delta: number; // e.g. +24% or -11%
}

export interface ComparisonProfile {
  baseRange: TimeRange;
  targetRange: TimeRange;
  shifts: GenreShift[];
  divergenceScore: number; // 0 - 100 change signal
  headline: string;
  narrative: string;
}

export interface MusicDimensions {
  exploration: number; // 0 - 100
  loyalty: number; // 0 - 100
  genreDiversity: number; // 0 - 100
  artistDiversity: number; // 0 - 100
  recentChange: number; // 0 - 100
  catalogDiversity: number; // 0 - 100
  listeningConsistency: number; // 0 - 100
}

export interface ArchetypeVisualProfile {
  accent: string;
  secondaryAccent: string;
  accentGlow: string;
  particleSpeed: number; // 0.1 to 2.0
  glowIntensity: number; // 0.2 to 1.0
  backgroundStyle: "mesh" | "nebula" | "radial" | "aurora" | "deep-drift";
  studioImage: string;
  energy: number; // 0 - 100
  calm: number; // 0 - 100
  nightAffinity: number; // 0 - 100
}

export interface MusicArchetype {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  visualProfile: ArchetypeVisualProfile;
}

export interface ScoredArchetype {
  archetype: MusicArchetype;
  score: number;
}

export interface MusicProfile {
  timeRange: TimeRange;
  datasetSize: {
    artists: number;
    tracks: number;
    genres: number;
  };
  dimensions: MusicDimensions;
  genreProfile: GenreProfile;
  artistProfile: ArtistProfile;
  trackProfile: TrackProfile;
  explorationScore: number;
  loyaltyScore: number;
  recentChangeScore: number;
  archetype: MusicArchetype;
  secondaryArchetype?: MusicArchetype;
  comparison?: ComparisonProfile;
  insights: {
    headline: string;
    universeNote: string;
    explorationNote: string;
    patternNote: string;
    summaryNote: string;
  };
}

export interface SpotifyUserProfile {
  id: string;
  displayName: string;
  email?: string;
  images?: { url: string; height?: number; width?: number }[];
  country?: string;
}

export type StorySceneId =
  | "welcome"
  | "universe"
  | "genres"
  | "artists"
  | "exploration"
  | "comparison"
  | "pattern"
  | "archetype"
  | "summary";
