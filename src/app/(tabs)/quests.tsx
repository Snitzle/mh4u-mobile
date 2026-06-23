import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { FilterChipRow } from '@/components/FilterChipRow';
import { MonsterPicker } from '@/components/MonsterPicker';
import { Card } from '@/components/ui';
import { api } from '@/lib/api';
import { STAR_OPTIONS } from '@/lib/filters';
import { theme } from '@/lib/theme';
import type { QuestSummary } from '@/lib/types';

export default function QuestsScreen() {
  const [stars, setStars] = useState<string | null>(null);
  const [monster, setMonster] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <FilterChipRow label="Rank" options={STAR_OPTIONS} value={stars} onChange={setStars} />
      <MonsterPicker value={monster} onChange={setMonster} />
      <EntityList<QuestSummary>
        queryKey={['quests', stars, monster]}
        fetchPage={(page) =>
          api.quests({
            page,
            per_page: 40,
            'filter[stars]': stars ?? undefined,
            'filter[monster]': monster ?? undefined,
          })
        }
        keyExtractor={(quest) => String(quest.id)}
        renderItem={(quest) => (
          <Card onPress={() => router.push(`/quests/${quest.id}`)}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>{quest.name}</Text>
              <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 2 }}>
                {'★'.repeat(quest.stars)} · {quest.hub} · {quest.type}
              </Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
