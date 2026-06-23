// Domain types mirroring the mh4u-api v1 resources (requested with ?lang=en).

export interface Paginated<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface MonsterSummary {
  id: number;
  name: string;
  class: string;
  icon_url: string | null;
}

export interface MonsterWeakness {
  state: string;
  elements: Record<'fire' | 'water' | 'thunder' | 'ice' | 'dragon', number>;
  ailments: Record<'poison' | 'paralysis' | 'sleep', number>;
}

export interface HuntingReward {
  condition: string;
  rank: string;
  percentage: number;
  item?: ItemSummary;
  monster?: MonsterSummary;
}

export interface Monster extends MonsterSummary {
  signature_move: string;
  trait: string;
  weaknesses?: MonsterWeakness[];
  habitats?: { location?: LocationSummary }[];
  hunting_rewards?: Record<string, HuntingReward[]>;
  quests?: QuestSummary[];
}

export interface ItemSummary {
  id: number;
  name: string;
  type: string;
  rarity: number;
  icon_url: string | null;
}

export interface Item extends ItemSummary {
  carry_capacity: number;
  buy: number | null;
  sell: number | null;
  description: string | null;
  monster_rewards?: HuntingReward[];
  gathering?: { area: string; rank: string; location?: LocationSummary }[];
  components_required?: { quantity: number; component_item?: ItemSummary }[];
  used_in?: { quantity: number; created_item?: ItemSummary }[];
}

export interface WeaponSummary {
  id: number;
  name: string | null;
  wtype: string;
  rarity: number | null;
  attack: number;
  icon_url: string | null;
}

export interface Weapon extends WeaponSummary {
  affinity: string;
  defense: number | null;
  num_slots: number;
  final: boolean | null;
  element?: { type: string; attack: number | null };
  sharpness?: string;
  ammo?: string;
  children?: WeaponSummary[];
  melodies?: { song: string; duration: string }[];
}

export interface ArmorSummary {
  id: number;
  name: string | null;
  slot: string;
  rarity: number | null;
  defense: number;
  icon_url: string | null;
}

export interface Armor extends ArmorSummary {
  max_defense: number | null;
  num_slots: number | null;
  resistances: Record<'fire' | 'water' | 'thunder' | 'ice' | 'dragon', number>;
  gender: string;
  hunter_type: string;
  skill_trees?: { id: number; name: string; points: number | null }[];
}

export interface QuestSummary {
  id: number;
  name: string;
  hub: string;
  type: string;
  stars: number;
}

export interface Quest extends QuestSummary {
  goal: string;
  reward: number;
  fee: number;
  hrp: number | null;
  location?: LocationSummary;
  monsters?: MonsterSummary[];
  rewards?: Record<string, { percentage: number; item?: ItemSummary }[]>;
}

export interface LocationSummary {
  id: number;
  name: string;
  map_url: string | null;
}

export interface SearchHit {
  type: string;
  id: number;
  name: string;
  icon_url: string | null;
}

export interface SearchResults {
  data: Record<string, SearchHit[]>;
  meta: { query: string };
}
