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
  traps: Record<string, number>;
}

export interface MonsterDamage {
  body_part: string;
  cut: number | null;
  impact: number | null;
  shot: number | null;
  fire: number | null;
  water: number | null;
  ice: number | null;
  thunder: number | null;
  dragon: number | null;
  ko: number | null;
}

export interface MonsterStatus {
  status: string;
  initial: number | null;
  increase: number | null;
  max: number | null;
  duration: number | null;
  damage: number | null;
}

export interface HuntingReward {
  condition: string;
  rank: string;
  percentage: number;
  item?: ItemSummary;
  monster?: MonsterSummary;
}

export interface MonsterStaggerLimit {
  region: string;
  value: number | null;
  value_cut: number | null;
  extract_color: string | null;
}

export interface MonsterTrapEffect {
  trap: string;
  normal: number | null;
  enraged: number | null;
  fatigued: number | null;
}

export interface Monster extends MonsterSummary {
  signature_move: string;
  trait: string;
  ecology: string | null;
  hp: {
    base: number;
    low_multiplier: number | null;
    high_multiplier: number | null;
    g_multiplier: number | null;
  } | null;
  size_class: string | null;
  crowns: { mini: number | null; large: number | null; king: number | null } | null;
  enraged: {
    duration: number | null;
    attack_modifier: number | null;
    defense_modifier: number | null;
    speed_modifier: number | null;
  } | null;
  limping: Record<string, number> | null;
  capture: Record<string, number> | null;
  damage?: MonsterDamage[];
  weaknesses?: MonsterWeakness[];
  statuses?: MonsterStatus[];
  ailments?: string[];
  habitats?: { location?: LocationSummary }[];
  stagger_limits?: MonsterStaggerLimit[];
  trap_effects?: MonsterTrapEffect[];
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

export type SharpnessColour = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'white' | 'purple';

export interface Weapon extends WeaponSummary {
  affinity: string;
  defense: number | null;
  num_slots: number;
  final: boolean | null;
  attack_modifier?: number;
  element?: { type: string; attack: number | null };
  sharpness?: { normal: Record<SharpnessColour, number>; plus: Record<SharpnessColour, number> } | null;
  ammo?: { item_id: number; item: string | null; capacity: number | null; special: number | null }[];
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
  priority?: string | null;
  map_time?: number | null;
  location?: LocationSummary;
  monsters?: MonsterSummary[];
  supplies?: { item_id: number; item: string | null; quantity: number | null }[];
  rewards?: Record<string, { percentage: number; item?: ItemSummary }[]>;
}

export interface LocationSummary {
  id: number;
  name: string;
  map_url: string | null;
}

export interface SkillTreeSummary {
  id: number;
  name: string;
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
