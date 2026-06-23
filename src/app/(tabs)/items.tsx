import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { FilterChipRow } from '@/components/FilterChipRow';
import { Card, Icon, RarityBadge } from '@/components/ui';
import { api } from '@/lib/api';
import { RARITY_OPTIONS } from '@/lib/filters';
import { theme } from '@/lib/theme';
import type { ItemSummary } from '@/lib/types';

export default function ItemsScreen() {
  const [rarity, setRarity] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <FilterChipRow label="Rarity" options={RARITY_OPTIONS} value={rarity} onChange={setRarity} />
      <EntityList<ItemSummary>
        queryKey={['items', rarity]}
        fetchPage={(page) => api.items({ page, per_page: 50, sort: 'name', 'filter[rarity]': rarity ?? undefined })}
        keyExtractor={(item) => String(item.id)}
        renderItem={(item) => (
          <Card onPress={() => router.push(`/items/${item.id}`)}>
            <Icon uri={item.icon_url} size={36} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <Text style={{ color: theme.textDim, fontSize: 12 }}>{item.type}</Text>
                <RarityBadge rarity={item.rarity} />
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
