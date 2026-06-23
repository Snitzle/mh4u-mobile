export interface FilterOption {
  value: string;
  label: string;
}

export const RARITY_OPTIONS: FilterOption[] = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

export const STAR_OPTIONS: FilterOption[] = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}★`,
}));
