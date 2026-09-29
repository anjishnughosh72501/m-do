import { GenreFamily } from "@/types";

/**
 * Deterministic genre classification dictionary.
 * Groups diverse micro-genres from Spotify's artist metadata into canonical EchoFlow genre families.
 * Fully transparent, zero external ML dependencies.
 */
export const GENRE_FAMILY_DISPLAY_NAMES: Record<GenreFamily, string> = {
  INDIE: "Indie & Alternative",
  POP: "Pop",
  ROCK: "Rock",
  ELECTRONIC: "Electronic & Dance",
  HIP_HOP: "Hip-Hop & Rap",
  RNB: "R&B",
  JAZZ: "Jazz",
  CLASSICAL: "Classical & Orchestral",
  METAL: "Metal",
  COUNTRY: "Country & Americana",
  LATIN: "Latin & Reggaeton",
  REGGAE: "Reggae & Dub",
  AMBIENT: "Ambient & Downtempo",
  FOLK: "Folk & Acoustic",
  SOUL: "Soul & Funk",
  OTHER: "Other Horizons",
};

// Keyword patterns to classify genres into families deterministically
const GENRE_PATTERNS: { family: GenreFamily; keywords: string[] }[] = [
  {
    family: "AMBIENT",
    keywords: [
      "ambient", "drone", "meditation", "new age", "soundtrack", "downtempo",
      "lo-fi", "chillhop", "chillout", "sleep", "field recording", "soundscapes",
    ],
  },
  {
    family: "ELECTRONIC",
    keywords: [
      "electronic", "techno", "house", "edm", "electro", "synth", "idm",
      "drum and bass", "dubstep", "trance", "hyperpop", "garage", "dance",
      "vaporwave", "hardstyle", "breakbeat", "eurodance", "bass", "club",
      "deep house", "tech house", "minimal techno", "industrial",
    ],
  },
  {
    family: "HIP_HOP",
    keywords: [
      "hip hop", "hip-hop", "rap", "trap", "drill", "boom bap", "grime",
      "conscious hip hop", "gangsta rap", "melodic rap", "plugg",
    ],
  },
  {
    family: "RNB",
    keywords: [
      "r&b", "rnb", "contemporary r&b", "neo soul", "alternative r&b",
      "quiet storm", "urban contemporary",
    ],
  },
  {
    family: "SOUL",
    keywords: [
      "soul", "funk", "motown", "disco", "northern soul", "southern soul",
      "afrobeat", "afrobeats", "groove",
    ],
  },
  {
    family: "METAL",
    keywords: [
      "metal", "death metal", "black metal", "thrash", "metalcore",
      "doom metal", "heavy metal", "deathcore", "sludge", "nu metal",
    ],
  },
  {
    family: "ROCK",
    keywords: [
      "rock", "punk", "hard rock", "grunge", "garage rock", "post-punk",
      "psychedelic rock", "classic rock", "emo", "shoegaze", "math rock",
      "prog rock", "screamo", "pop punk", "blues rock", "new wave",
    ],
  },
  {
    family: "INDIE",
    keywords: [
      "indie", "indie pop", "indie rock", "chamber pop", "art pop",
      "dream pop", "bedroom pop", "lo-fi indie", "freak folk", "slowcore",
      "twee", "alt-country",
    ],
  },
  {
    family: "JAZZ",
    keywords: [
      "jazz", "bebop", "fusion", "modal jazz", "hard bop", "bossa nova",
      "cool jazz", "free jazz", "vocal jazz", "big band", "smooth jazz",
    ],
  },
  {
    family: "CLASSICAL",
    keywords: [
      "classical", "orchestral", "baroque", "romantic era", "symphony",
      "chamber", "opera", "contemporary classical", "choral", "piano solo",
      "string quartet", "soundtrack", "film score", "minimalism",
    ],
  },
  {
    family: "FOLK",
    keywords: [
      "folk", "acoustic", "singer-songwriter", "bluegrass", "traditional folk",
      "celtic", "appalachian", "americana",
    ],
  },
  {
    family: "COUNTRY",
    keywords: [
      "country", "contemporary country", "outlaw country", "nashville sound",
      "texas country", "honky tonk",
    ],
  },
  {
    family: "LATIN",
    keywords: [
      "latin", "reggaeton", "salsa", "bachata", "cumbia", "urbano latino",
      "latin pop", "trap latino", "bossa", "samba", "flamenco",
    ],
  },
  {
    family: "REGGAE",
    keywords: [
      "reggae", "dub", "dancehall", "ska", "rocksteady", "roots reggae",
    ],
  },
  {
    family: "POP",
    keywords: [
      "pop", "dance pop", "electropop", "synthpop", "teen pop", "post-teen pop",
      "europop", "k-pop", "j-pop", "latin pop", "bubblegum",
    ],
  },
];

/**
 * Maps any arbitrary raw genre string to its canonical GenreFamily.
 * Time complexity: O(m * k) where m is keyword count and k is string length.
 */
export function mapGenreToFamily(rawGenre: string): GenreFamily {
  const normalized = rawGenre.toLowerCase().trim();

  for (const { family, keywords } of GENRE_PATTERNS) {
    for (const kw of keywords) {
      if (normalized === kw || normalized.includes(kw)) {
        return family;
      }
    }
  }

  return "OTHER";
}
