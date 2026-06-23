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

export const ELEMENT_OPTIONS: FilterOption[] = [
  'Fire', 'Water', 'Thunder', 'Ice', 'Dragon', 'Blastblight', 'Poison', 'Paralysis', 'Sleep',
].map((element) => ({ value: element, label: element }));

export const ITEM_TYPE_OPTIONS: FilterOption[] = [
  'Account', 'Ammo', 'Bait', 'Bone', 'Book', 'Bug', 'Coating', 'Coin/Ticket', 'Commodity',
  'Consumable', 'Decoration', 'Fish', 'Flesh', 'Meat', 'Nectar', 'Ore', 'Plant', 'Sac/Fluid',
  'Scrap', 'Supply', 'Tool', 'Wystone',
].map((type) => ({ value: type, label: type }));
