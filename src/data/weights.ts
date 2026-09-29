/**
 * Deterministic scoring weights for EchoFlow dimension calculations and archetype affinity.
 * Strictly aligned with Requirement 28 and signature archetype profiles.
 */

export const EXPLORATION_WEIGHTS = {
  genreDiversity: 0.35,
  artistDiversity: 0.35,
  catalogDiversity: 0.15,
  recentChange: 0.15,
};

export const LOYALTY_WEIGHTS = {
  topArtistConcentration: 0.40,
  top5Concentration: 0.35,
  genreDominance: 0.25,
};

export const RECENT_CHANGE_WEIGHTS = {
  genreDivergence: 0.60,
  artistTurnover: 0.40,
};

export interface ArchetypeScoringRule {
  calc: (dim: {
    exploration: number;
    loyalty: number;
    genreDiversity: number;
    artistDiversity: number;
    recentChange: number;
    catalogDiversity: number;
    listeningConsistency: number;
  }) => number;
}

/**
 * Normalized scoring rules for each archetype.
 * Follows Requirement 28:
 * - THE EXPLORER: High exploration, genre breadth, and artist discovery.
 * - THE ANCHOR: High loyalty, listening consistency, and artist concentration.
 * - THE NOMAD: High recent change and rapid sonic evolution.
 * - THE ECLECTIC: High genre entropy with stable, balanced palette.
 * - THE AFTER_HOURS: Steady nocturnal pulse, consistency, and catalog depth.
 * - THE FOCUSED: Pure listening consistency and disciplined sound spaces.
 * - THE ROMANTIC: Melodic attachment, lyrical resonance, and catalog variety.
 * - THE WANDERER: Deep catalog drift with steady, unhurried continuity.
 */
export const ARCHETYPE_SCORING_RULES: Record<string, ArchetypeScoringRule> = {
  EXPLORER: {
    calc: (d) =>
      d.exploration * 0.55 +
      d.genreDiversity * 0.20 +
      d.artistDiversity * 0.15 +
      d.recentChange * 0.10,
  },
  ANCHOR: {
    calc: (d) =>
      d.loyalty * 0.55 +
      d.listeningConsistency * 0.30 +
      (100 - d.artistDiversity) * 0.15,
  },
  NOMAD: {
    calc: (d) =>
      d.recentChange * 0.55 +
      d.exploration * 0.25 +
      (100 - d.listeningConsistency) * 0.20,
  },
  ECLECTIC: {
    calc: (d) =>
      d.genreDiversity * 0.45 +
      d.artistDiversity * 0.25 +
      (100 - d.loyalty) * 0.15 +
      (100 - d.recentChange) * 0.15,
  },
  AFTER_HOURS: {
    calc: (d) =>
      d.listeningConsistency * 0.35 +
      d.catalogDiversity * 0.30 +
      d.loyalty * 0.20 +
      (100 - d.recentChange) * 0.15,
  },
  FOCUSED: {
    calc: (d) =>
      d.listeningConsistency * 0.50 +
      d.loyalty * 0.25 +
      (100 - d.genreDiversity) * 0.25,
  },
  ROMANTIC: {
    calc: (d) =>
      d.loyalty * 0.35 +
      d.catalogDiversity * 0.30 +
      (100 - d.recentChange) * 0.20 +
      d.artistDiversity * 0.15,
  },
  WANDERER: {
    calc: (d) =>
      d.catalogDiversity * 0.45 +
      d.listeningConsistency * 0.25 +
      (100 - d.recentChange) * 0.20 +
      d.artistDiversity * 0.10,
  },
};

export const SECONDARY_ARCHETYPE_THRESHOLD = 8.0;
