import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { analyzeMusic } from "../src/features/analyzer/music-profile-analyzer";
import { DEMO_PERSONAS } from "../src/data/demo-data";
import {
  calculateNormalizedEntropy,
  calculateNormalizedConcentration,
} from "../src/features/analyzer/diversity-calculator";
import { mapGenreToFamily } from "../src/data/genre-map";

describe("EchoFlow Pure Analyzer Engine", () => {
  it("computes Shannon Entropy correctly: uniform spread gives 100%, monopoly gives 0%", () => {
    // Uniform spread across 4 categories
    const uniform = [10, 10, 10, 10];
    const entropyUniform = calculateNormalizedEntropy(uniform);
    assert.equal(entropyUniform, 100);

    // Complete concentration (1 item)
    const monopoly = [50];
    const entropyMonopoly = calculateNormalizedEntropy(monopoly);
    assert.equal(entropyMonopoly, 0);

    // HHI concentration
    assert.equal(calculateNormalizedConcentration(monopoly), 100);
    assert.equal(calculateNormalizedConcentration(uniform), 0);
  });

  it("evaluates Explorer Dataset with exploration score > 80 and classifies as THE EXPLORER", () => {
    const explorerDataset = DEMO_PERSONAS.explorer.datasets.short_term;
    const longTermDataset = DEMO_PERSONAS.explorer.datasets.long_term;

    const profile = analyzeMusic(explorerDataset, longTermDataset);

    assert.ok(
      profile.explorationScore > 80,
      `Expected explorationScore > 80, but got ${profile.explorationScore}`
    );
    assert.equal(profile.archetype.id, "EXPLORER");
    assert.ok(profile.genreProfile.genreCount >= 8);
  });

  it("evaluates Loyalist Dataset with loyalty score > 80 and classifies as THE ANCHOR", () => {
    const loyalistDataset = DEMO_PERSONAS.anchor.datasets.short_term;
    const profile = analyzeMusic(loyalistDataset);

    assert.ok(
      profile.loyaltyScore > 80,
      `Expected loyaltyScore > 80, but got ${profile.loyaltyScore}`
    );
    assert.equal(profile.archetype.id, "ANCHOR");
  });

  it("evaluates Nomad Changing Dataset with recentChange > 70 and classifies as THE NOMAD", () => {
    const current = DEMO_PERSONAS.nomad.datasets.short_term;
    const previous = DEMO_PERSONAS.nomad.datasets.long_term;

    const profile = analyzeMusic(current, previous);

    assert.ok(
      profile.recentChangeScore > 70,
      `Expected recentChangeScore > 70, but got ${profile.recentChangeScore}`
    );
    assert.equal(profile.archetype.id, "NOMAD");
    assert.ok(profile.comparison !== undefined);
    assert.ok(profile.comparison.shifts.length > 0);
  });

  it("evaluates After-Hours Dataset and classifies as THE AFTER-HOURS", () => {
    const dataset = DEMO_PERSONAS.after_hours.datasets.short_term;
    const profile = analyzeMusic(dataset);

    assert.equal(profile.archetype.id, "AFTER_HOURS");
    assert.ok(profile.dimensions.listeningConsistency >= 70);
  });

  it("maps genres deterministically with fallback to OTHER", () => {
    assert.equal(mapGenreToFamily("indie pop"), "INDIE");
    assert.equal(mapGenreToFamily("minimal techno"), "ELECTRONIC");
    assert.equal(mapGenreToFamily("afrobeat"), "SOUL");
    assert.equal(mapGenreToFamily("contemporary classical"), "CLASSICAL");
    assert.equal(mapGenreToFamily("completely unknown subterranean noise"), "OTHER");
  });

  it("guarantees deterministic output for identical inputs", () => {
    const dataset = DEMO_PERSONAS.explorer.datasets.short_term;
    const run1 = analyzeMusic(dataset);
    const run2 = analyzeMusic(dataset);

    assert.deepEqual(run1.dimensions, run2.dimensions);
    assert.equal(run1.archetype.id, run2.archetype.id);
    assert.equal(run1.explorationScore, run2.explorationScore);
    assert.equal(run1.loyaltyScore, run2.loyaltyScore);
  });
});
