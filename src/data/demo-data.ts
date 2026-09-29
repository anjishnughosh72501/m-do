import { ListeningDataset, TimeRange } from "@/types";

/**
 * Realistic synthetic demo datasets representing distinct listening archetypes.
 * Crafted using original synthetic artist and track titles to respect copyrights.
 */

// -------------------------------------------------------------
// PERSONA 1: THE EXPLORER (High entropy, 10+ genre families, high turnover)
// -------------------------------------------------------------
const EXPLORER_SHORT_TERM: ListeningDataset = {
  range: "short_term",
  topArtists: [
    { id: "exp-art-1", name: "Aetheric Pulse", genres: ["idm", "ambient techno", "electronic"], uri: "spotify:artist:exp1" },
    { id: "exp-art-2", name: "Velvet Horizon", genres: ["dream pop", "shoegaze", "indie"], uri: "spotify:artist:exp2" },
    { id: "exp-art-3", name: "Komorebi Ensemble", genres: ["contemporary classical", "minimalism", "piano solo"], uri: "spotify:artist:exp3" },
    { id: "exp-art-4", name: "Solar Meridian", genres: ["afrobeat", "groove", "funk", "soul"], uri: "spotify:artist:exp4" },
    { id: "exp-art-5", name: "Neon Mirage", genres: ["synthwave", "hyperpop", "electropop"], uri: "spotify:artist:exp5" },
    { id: "exp-art-6", name: "Canyon Echoes", genres: ["bluegrass", "folk", "acoustic"], uri: "spotify:artist:exp6" },
    { id: "exp-art-7", name: "Astral Quartet", genres: ["modal jazz", "bebop", "fusion"], uri: "spotify:artist:exp7" },
    { id: "exp-art-8", name: "Sombra Urbana", genres: ["latin", "trap latino", "cumbia"], uri: "spotify:artist:exp8" },
    { id: "exp-art-9", name: "Submerged Frequencies", genres: ["dub", "downtempo", "reggae"], uri: "spotify:artist:exp9" },
    { id: "exp-art-10", name: "Obsidian Core", genres: ["post-punk", "darkwave", "rock"], uri: "spotify:artist:exp10" },
    { id: "exp-art-11", name: "Silver Linings", genres: ["r&b", "neo soul"], uri: "spotify:artist:exp11" },
    { id: "exp-art-12", name: "Kinetic Drift", genres: ["drum and bass", "breakbeat"], uri: "spotify:artist:exp12" },
  ],
  topTracks: [
    { id: "exp-trk-1", name: "Phase Shift", artistIds: ["exp-art-1"], artistNames: ["Aetheric Pulse"], albumName: "Resonant Fields", durationMs: 245000, uri: "spotify:track:exp1" },
    { id: "exp-trk-2", name: "Luminous Reverie", artistIds: ["exp-art-2"], artistNames: ["Velvet Horizon"], albumName: "Silver Mist", durationMs: 198000, uri: "spotify:track:exp2" },
    { id: "exp-trk-3", name: "First Light Falling", artistIds: ["exp-art-3"], artistNames: ["Komorebi Ensemble"], albumName: "Quietude", durationMs: 312000, uri: "spotify:track:exp3" },
    { id: "exp-trk-4", name: "Equatorial Warmth", artistIds: ["exp-art-4"], artistNames: ["Solar Meridian"], albumName: "Dusk to Noon", durationMs: 220000, uri: "spotify:track:exp4" },
    { id: "exp-trk-5", name: "Hyperglow", artistIds: ["exp-art-5"], artistNames: ["Neon Mirage"], albumName: "Prism City", durationMs: 184000, uri: "spotify:track:exp5" },
    { id: "exp-trk-6", name: "Pine & Stone", artistIds: ["exp-art-6"], artistNames: ["Canyon Echoes"], albumName: "High Pass", durationMs: 205000, uri: "spotify:track:exp6" },
    { id: "exp-trk-7", name: "Constellation B", artistIds: ["exp-art-7"], artistNames: ["Astral Quartet"], albumName: "Midnight Sessions", durationMs: 345000, uri: "spotify:track:exp7" },
    { id: "exp-trk-8", name: "Nocturno del Sol", artistIds: ["exp-art-8"], artistNames: ["Sombra Urbana"], albumName: "Vibras", durationMs: 172000, uri: "spotify:track:exp8" },
    { id: "exp-trk-9", name: "Echo Chamber 4", artistIds: ["exp-art-9"], artistNames: ["Submerged Frequencies"], albumName: "Deep Water Dub", durationMs: 278000, uri: "spotify:track:exp9" },
    { id: "exp-trk-10", name: "Glass Monolith", artistIds: ["exp-art-10"], artistNames: ["Obsidian Core"], albumName: "Shadow Work", durationMs: 231000, uri: "spotify:track:exp10" },
  ],
  recentlyPlayed: [
    { id: "exp-rec-1", name: "Boreal Shimmer", artistIds: ["exp-art-13"], artistNames: ["Nordic Winds"], uri: "spotify:track:rec1" },
    { id: "exp-rec-2", name: "Desert Flute 9", artistIds: ["exp-art-14"], artistNames: ["Oasis Collective"], uri: "spotify:track:rec2" },
  ],
};

const EXPLORER_LONG_TERM: ListeningDataset = {
  range: "long_term",
  topArtists: [
    { id: "exp-art-1", name: "Aetheric Pulse", genres: ["idm", "ambient techno"], uri: "spotify:artist:exp1" },
    { id: "exp-art-2", name: "Velvet Horizon", genres: ["dream pop", "shoegaze"], uri: "spotify:artist:exp2" },
    { id: "exp-art-15", name: "Old Pine Trio", genres: ["folk", "americana"], uri: "spotify:artist:exp15" },
    { id: "exp-art-16", name: "Analog Symphony", genres: ["classical", "orchestral"], uri: "spotify:artist:exp16" },
    { id: "exp-art-17", name: "Pacific Groove", genres: ["funk", "disco"], uri: "spotify:artist:exp17" },
  ],
  topTracks: [
    { id: "exp-trk-1", name: "Phase Shift", artistIds: ["exp-art-1"], artistNames: ["Aetheric Pulse"], durationMs: 245000, uri: "spotify:track:exp1" },
  ],
  recentlyPlayed: [],
};

// -------------------------------------------------------------
// PERSONA 2: THE ANCHOR (High loyalty, low entropy, repeated top artists)
// -------------------------------------------------------------
const LOYALIST_SHORT_TERM: ListeningDataset = {
  range: "short_term",
  topArtists: [
    { id: "anc-art-1", name: "The Static Pines", genres: ["indie rock", "post-punk", "alternative rock"], uri: "spotify:artist:anc1" },
    { id: "anc-art-2", name: "Harbor & Wire", genres: ["indie rock", "garage rock"], uri: "spotify:artist:anc2" },
    { id: "anc-art-3", name: "Autumn Cartel", genres: ["indie pop", "chamber pop"], uri: "spotify:artist:anc3" },
    { id: "anc-art-4", name: "Cranberry Sky", genres: ["indie rock", "shoegaze"], uri: "spotify:artist:anc4" },
    { id: "anc-art-5", name: "Fable Theory", genres: ["indie pop", "bedroom pop"], uri: "spotify:artist:anc5" },
  ],
  topTracks: [
    { id: "anc-trk-1", name: "Northbound Express", artistIds: ["anc-art-1"], artistNames: ["The Static Pines"], albumName: "Iron Rails", durationMs: 230000, uri: "spotify:track:anc1" },
    { id: "anc-trk-2", name: "Copper Key", artistIds: ["anc-art-1"], artistNames: ["The Static Pines"], albumName: "Iron Rails", durationMs: 215000, uri: "spotify:track:anc2" },
    { id: "anc-trk-3", name: "Signal Fires", artistIds: ["anc-art-1"], artistNames: ["The Static Pines"], albumName: "Iron Rails", durationMs: 240000, uri: "spotify:track:anc3" },
    { id: "anc-trk-4", name: "Lighthouse Keeper", artistIds: ["anc-art-2"], artistNames: ["Harbor & Wire"], albumName: "Salt & Battery", durationMs: 195000, uri: "spotify:track:anc4" },
    { id: "anc-trk-5", name: "Foghorn Blues", artistIds: ["anc-art-2"], artistNames: ["Harbor & Wire"], albumName: "Salt & Battery", durationMs: 210000, uri: "spotify:track:anc5" },
    { id: "anc-trk-6", name: "Falling Leaves", artistIds: ["anc-art-3"], artistNames: ["Autumn Cartel"], albumName: "Seasons End", durationMs: 180000, uri: "spotify:track:anc6" },
    { id: "anc-trk-7", name: "December Window", artistIds: ["anc-art-3"], artistNames: ["Autumn Cartel"], albumName: "Seasons End", durationMs: 190000, uri: "spotify:track:anc7" },
  ],
  recentlyPlayed: [
    { id: "anc-trk-1", name: "Northbound Express", artistIds: ["anc-art-1"], artistNames: ["The Static Pines"], uri: "spotify:track:anc1" },
  ],
};

const LOYALIST_LONG_TERM: ListeningDataset = {
  range: "long_term",
  topArtists: [
    { id: "anc-art-1", name: "The Static Pines", genres: ["indie rock", "post-punk"], uri: "spotify:artist:anc1" },
    { id: "anc-art-2", name: "Harbor & Wire", genres: ["indie rock"], uri: "spotify:artist:anc2" },
    { id: "anc-art-3", name: "Autumn Cartel", genres: ["indie pop"], uri: "spotify:artist:anc3" },
  ],
  topTracks: [
    { id: "anc-trk-1", name: "Northbound Express", artistIds: ["anc-art-1"], artistNames: ["The Static Pines"], durationMs: 230000, uri: "spotify:track:anc1" },
  ],
  recentlyPlayed: [],
};

// -------------------------------------------------------------
// PERSONA 3: THE NOMAD (Dramatic shift: Rock in long_term -> Electronic in short_term)
// -------------------------------------------------------------
const NOMAD_SHORT_TERM: ListeningDataset = {
  range: "short_term",
  topArtists: [
    { id: "nom-art-1", name: "Subzero Subsystem", genres: ["minimal techno", "industrial techno", "electronic"], uri: "spotify:artist:nom1" },
    { id: "nom-art-2", name: "Analog Frequency", genres: ["electro", "synth", "dance"], uri: "spotify:artist:nom2" },
    { id: "nom-art-3", name: "Modulation Unit", genres: ["idm", "drum and bass", "breakbeat"], uri: "spotify:artist:nom3" },
    { id: "nom-art-4", name: "Glitch Architecture", genres: ["ambient", "downtempo"], uri: "spotify:artist:nom4" },
  ],
  topTracks: [
    { id: "nom-trk-1", name: "Circuit Breaker", artistIds: ["nom-art-1"], artistNames: ["Subzero Subsystem"], albumName: "Grid Matrix", durationMs: 380000, uri: "spotify:track:nom1" },
    { id: "nom-trk-2", name: "Voltage Spike", artistIds: ["nom-art-2"], artistNames: ["Analog Frequency"], albumName: "Modular 01", durationMs: 310000, uri: "spotify:track:nom2" },
    { id: "nom-trk-3", name: "Kinetic Core", artistIds: ["nom-art-3"], artistNames: ["Modulation Unit"], albumName: "Velocity", durationMs: 285000, uri: "spotify:track:nom3" },
  ],
  recentlyPlayed: [],
};

const NOMAD_LONG_TERM: ListeningDataset = {
  range: "long_term",
  topArtists: [
    { id: "nom-old-1", name: "Crest of Thunder", genres: ["hard rock", "classic rock", "blues rock"], uri: "spotify:artist:old1" },
    { id: "nom-old-2", name: "Redwood Riff", genres: ["grunge", "rock", "punk"], uri: "spotify:artist:old2" },
    { id: "nom-old-3", name: "Prairie Gold", genres: ["country", "americana", "folk"], uri: "spotify:artist:old3" },
  ],
  topTracks: [
    { id: "nom-old-trk1", name: "Dust Road Anthem", artistIds: ["nom-old-1"], artistNames: ["Crest of Thunder"], durationMs: 240000, uri: "spotify:track:old1" },
  ],
  recentlyPlayed: [],
};

// -------------------------------------------------------------
// PERSONA 4: THE AFTER-HOURS (Nocturnal downtempo, ambient, deep house)
// -------------------------------------------------------------
const AFTER_HOURS_SHORT_TERM: ListeningDataset = {
  range: "short_term",
  topArtists: [
    { id: "aft-art-1", name: "Nocturne Echoes", genres: ["ambient", "drone", "soundscapes", "meditation"], uri: "spotify:artist:aft1" },
    { id: "aft-art-2", name: "Deep Drift Project", genres: ["downtempo", "lo-fi", "chillhop"], uri: "spotify:artist:aft2" },
    { id: "aft-art-3", name: "Moonlit Terminal", genres: ["deep house", "minimal techno", "electronic"], uri: "spotify:artist:aft3" },
    { id: "aft-art-4", name: "Midnight Solitude", genres: ["contemporary classical", "piano solo"], uri: "spotify:artist:aft4" },
  ],
  topTracks: [
    { id: "aft-trk-1", name: "3:00 AM Overlook", artistIds: ["aft-art-1"], artistNames: ["Nocturne Echoes"], albumName: "Blue Hour", durationMs: 420000, uri: "spotify:track:aft1" },
    { id: "aft-trk-2", name: "Rain on Glass", artistIds: ["aft-art-2"], artistNames: ["Deep Drift Project"], albumName: "Night Window", durationMs: 190000, uri: "spotify:track:aft2" },
    { id: "aft-trk-3", name: "Subterranean Glow", artistIds: ["aft-art-3"], artistNames: ["Moonlit Terminal"], albumName: "Undercurrent", durationMs: 360000, uri: "spotify:track:aft3" },
  ],
  recentlyPlayed: [],
};

export interface DemoPersona {
  id: string;
  name: string;
  tagline: string;
  datasets: Record<TimeRange, ListeningDataset>;
}

export const DEMO_PERSONAS: Record<string, DemoPersona> = {
  explorer: {
    id: "explorer",
    name: "The Sonic Explorer",
    tagline: "Spans 10+ genres across electronic, indie, jazz, and global sounds",
    datasets: {
      short_term: EXPLORER_SHORT_TERM,
      medium_term: EXPLORER_SHORT_TERM,
      long_term: EXPLORER_LONG_TERM,
    },
  },
  anchor: {
    id: "anchor",
    name: "The Loyal Anchor",
    tagline: "Devoted follower with high concentration in top indie rock staples",
    datasets: {
      short_term: LOYALIST_SHORT_TERM,
      medium_term: LOYALIST_SHORT_TERM,
      long_term: LOYALIST_LONG_TERM,
    },
  },
  nomad: {
    id: "nomad",
    name: "The Seasonal Nomad",
    tagline: "Radical shift from classic rock heritage to futuristic minimal techno",
    datasets: {
      short_term: NOMAD_SHORT_TERM,
      medium_term: NOMAD_SHORT_TERM,
      long_term: NOMAD_LONG_TERM,
    },
  },
  after_hours: {
    id: "after_hours",
    name: "The After-Hours Sleeper",
    tagline: "Submerged nocturnal soundscapes, ambient piano, and moody downtempo",
    datasets: {
      short_term: AFTER_HOURS_SHORT_TERM,
      medium_term: AFTER_HOURS_SHORT_TERM,
      long_term: AFTER_HOURS_SHORT_TERM,
    },
  },
};
