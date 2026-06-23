import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';
import type { SearchHit } from '@/lib/types';

const GROUP_LABELS: Record<string, string> = {
  monsters: 'Monsters',
  weapons: 'Weapons',
  armor: 'Armor',
  decorations: 'Decorations',
  items: 'Items',
  quests: 'Quests',
  locations: 'Locations',
  skill_trees: 'Skill Trees',
};

const PATHS: Record<string, string> = {
  monster: '/monsters',
  weapon: '/weapons',
  armor: '/armor',
  decoration: '/items',
  item: '/items',
  quest: '/quests',
};

export default function SearchScreen() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  const search = useQuery({
    queryKey: ['search', query],
    queryFn: () => api.search(query),
    enabled: query.trim().length > 0,
  });

  const groups = Object.entries(search.data?.data ?? {}).filter(([, hits]) => hits.length > 0);

  const open = (hit: SearchHit) => {
    const base = PATHS[hit.type];
    if (base) router.push(`${base}/${hit.id}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => setQuery(text)}
          returnKeyType="search"
          placeholder="Search monsters, items…"
          placeholderTextColor={theme.textFaint}
          autoCorrect={false}
          style={styles.input}
        />
      </View>

      {search.isFetching && <ActivityIndicator color={theme.accent} style={{ marginTop: 24 }} />}

      {!search.isFetching && query.length > 0 && groups.length === 0 && (
        <Text style={styles.empty}>No results for “{query}”.</Text>
      )}

      <ScrollView contentContainerStyle={{ padding: 16, gap: 18 }}>
        {groups.map(([group, hits]) => (
          <View key={group} style={{ gap: 8 }}>
            <Text style={styles.groupTitle}>{GROUP_LABELS[group] ?? group}</Text>
            {hits.map((hit) => (
              <Pressable
                key={`${hit.type}-${hit.id}`}
                onPress={() => open(hit)}
                style={({ pressed }) => [styles.hit, pressed ? { opacity: 0.7 } : null]}
              >
                <Icon uri={hit.icon_url} size={34} />
                <Text style={styles.hitName}>{hit.name}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: { padding: 16, paddingBottom: 4 },
  input: {
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: theme.text,
    fontSize: 16,
  },
  empty: { color: theme.textDim, textAlign: 'center', marginTop: 24 },
  groupTitle: {
    color: theme.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  hit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  hitName: { color: theme.text, fontSize: 15, flex: 1 },
});
