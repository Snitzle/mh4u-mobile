import type {
  Armor,
  ArmorSummary,
  Item,
  ItemSummary,
  Monster,
  MonsterSummary,
  Paginated,
  Quest,
  QuestSummary,
  SearchResults,
  Weapon,
  WeaponSummary,
} from './types';

// iOS simulator can reach the host's localhost directly. For a physical device
// set EXPO_PUBLIC_API_BASE to your machine's LAN address.
const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? 'http://localhost:8088/api/v1';

type Query = Record<string, string | number | undefined>;

async function apiGet<T>(path: string, query: Query = {}): Promise<T> {
  const params = new URLSearchParams({ lang: 'en' });
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '') params.set(key, String(value));
  }

  const response = await fetch(`${API_BASE}${path}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`API ${response.status}: ${path}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  monsters: (query?: Query) => apiGet<Paginated<MonsterSummary>>('/monsters', query),
  monster: (id: string | number) => apiGet<{ data: Monster }>(`/monsters/${id}`).then((r) => r.data),

  weapons: (query?: Query) => apiGet<Paginated<WeaponSummary>>('/weapons', query),
  weapon: (id: string | number) => apiGet<{ data: Weapon }>(`/weapons/${id}`).then((r) => r.data),

  armorList: (query?: Query) => apiGet<Paginated<ArmorSummary>>('/armor', query),
  armor: (id: string | number) => apiGet<{ data: Armor }>(`/armor/${id}`).then((r) => r.data),

  items: (query?: Query) => apiGet<Paginated<ItemSummary>>('/items', query),
  item: (id: string | number) => apiGet<{ data: Item }>(`/items/${id}`).then((r) => r.data),

  quests: (query?: Query) => apiGet<Paginated<QuestSummary>>('/quests', query),
  quest: (id: string | number) => apiGet<{ data: Quest }>(`/quests/${id}`).then((r) => r.data),

  search: (q: string) => apiGet<SearchResults>('/search', { q }),
};
