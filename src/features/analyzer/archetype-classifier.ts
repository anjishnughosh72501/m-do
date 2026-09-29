import { MusicArchetype, MusicDimensions, ScoredArchetype } from "@/types";
import { ARCHETYPES } from "@/data/archetypes";
import {
  ARCHETYPE_SCORING_RULES,
  SECONDARY_ARCHETYPE_THRESHOLD,
} from "@/data/weights";

/**
 * ArchetypeClassifier
 * Deterministically maps a 7-dimensional music profile to an EchoFlow archetype.
 *
 * Complexity: O(A * D) where A = 8 archetypes and D = 7 dimensions.
 */
export function classifyArchetype(dimensions: MusicDimensions): {
  primary: MusicArchetype;
  secondary?: MusicArchetype;
  allScores: ScoredArchetype[];
} {
  const scoredList: ScoredArchetype[] = [];

  for (const [key, archetype] of Object.entries(ARCHETYPES)) {
    const rule = ARCHETYPE_SCORING_RULES[key];
    if (!rule) continue;

    const rawScore = rule.calc(dimensions);
    const normalizedScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    scoredList.push({
      archetype,
      score: normalizedScore,
    });
  }

  // Sort descending by score
  scoredList.sort((a, b) => b.score - a.score);

  const primary = scoredList[0].archetype;
  let secondary: MusicArchetype | undefined;

  // Check if runner-up is within threshold
  if (
    scoredList.length > 1 &&
    scoredList[0].score - scoredList[1].score <= SECONDARY_ARCHETYPE_THRESHOLD
  ) {
    secondary = scoredList[1].archetype;
  }

  return {
    primary,
    secondary,
    allScores: scoredList,
  };
}
