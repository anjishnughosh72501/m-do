/**
 * DIVERSITY & CONCENTRATION CALCULATORS
 *
 * Implements rigorous mathematical information-theory metrics:
 * 1. Normalized Shannon Entropy: Measures uniformity of distribution (Diversity).
 *    Entropy H(X) = - Σ (p_i * log2(p_i))
 *    Maximum possible entropy H_max = log2(N) where N is number of categories.
 *    Normalized Entropy = (H(X) / H_max) * 100
 *    Range: [0, 100]. A score of 100 means perfectly even spread; 0 means complete concentration in 1 item.
 *
 * 2. Normalized Herfindahl-Hirschman Index (HHI): Measures market/item concentration.
 *    HHI = Σ (p_i)^2
 *    Normalized HHI = ((HHI - (1/N)) / (1 - (1/N))) * 100
 *    Range: [0, 100]. 100 means monopoly (single category); 0 means uniform distribution.
 *
 * Complexity: O(N) where N is the number of distribution bins/categories.
 */

/**
 * Calculates normalized Shannon entropy given an array of counts or weights.
 * @param counts Non-negative counts/frequencies of each category.
 * @returns Score from 0 to 100 representing diversity.
 */
export function calculateNormalizedEntropy(counts: number[]): number {
  const filtered = counts.filter((c) => c > 0);
  const n = filtered.length;

  if (n <= 1) {
    return 0; // Single category or empty has zero diversity
  }

  const total = filtered.reduce((acc, val) => acc + val, 0);
  if (total === 0) return 0;

  // Calculate Shannon Entropy: - Σ (p_i * log2(p_i))
  let entropy = 0;
  for (const count of filtered) {
    const p = count / total;
    entropy -= p * Math.log2(p);
  }

  // Theoretical maximum entropy for n discrete states is log2(n)
  const maxEntropy = Math.log2(n);
  if (maxEntropy === 0) return 0;

  const normalized = (entropy / maxEntropy) * 100;
  return Math.min(100, Math.max(0, Math.round(normalized * 10) / 10));
}

/**
 * Calculates normalized Herfindahl-Hirschman Index (Concentration).
 * @param counts Non-negative counts/frequencies of each category.
 * @returns Score from 0 to 100 representing concentration.
 */
export function calculateNormalizedConcentration(counts: number[]): number {
  const filtered = counts.filter((c) => c > 0);
  const n = filtered.length;

  if (n <= 1) {
    return 100; // Complete monopoly
  }

  const total = filtered.reduce((acc, val) => acc + val, 0);
  if (total === 0) return 0;

  // HHI is sum of squared proportions: Σ (p_i)^2
  let hhi = 0;
  for (const count of filtered) {
    const p = count / total;
    hhi += p * p;
  }

  // Normalize between [1/n, 1] -> [0, 100]
  const minHhi = 1 / n;
  const normalized = ((hhi - minHhi) / (1 - minHhi)) * 100;

  return Math.min(100, Math.max(0, Math.round(normalized * 10) / 10));
}
