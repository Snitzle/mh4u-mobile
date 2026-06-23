import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { FilterChipRow } from '@/components/FilterChipRow';
import { Card, Icon, RarityBadge } from '@/components/ui';
import { api } from '@/lib/api';
import { RARITY_OPTIONS } from '@/lib/filters';
import { theme } from '@/lib/theme';
import type { ArmorSummary } from '@/lib/types';

export default function ArmorScreen() {
  const [rarity, setRarity] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <FilterChipRow label="Rarity" options={RARITY_OPTIONS} value={rarity} onChange={setRarity} />
      <EntityList<ArmorSummary>
        queryKey={['armor', rarity]}
        fetchPage={(page) => api.armorList({ page, per_page: 50, 'filter[rarity]': rarity ?? undefined })}
        keyExtractor={(piece) => String(piece.id)}
        renderItem={(piece) => (
          <Card onPress={() => router.push(`/armor/${piece.id}`)}>
            <Icon uri={piece.icon_url} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>{piece.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <Text style={{ color: theme.textDim, fontSize: 12 }}>
                  {piece.slot} · DEF {piece.defense}
                </Text>
                <RarityBadge rarity={piece.rarity} />
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
