export interface StyleOnboardingInput {
  sizes: string[];
  categories: string[];
  colors: string[];
  budgetMin?: number;
  budgetMax?: number;
  inspirationCount: number;
}

export function calculateStyleProfileCompleteness(input: StyleOnboardingInput) {
  const checks = [
    input.sizes.length > 0,
    input.categories.length >= 2,
    input.colors.length >= 2,
    typeof input.budgetMin === "number" && typeof input.budgetMax === "number",
    input.inspirationCount >= 3,
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
