import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { FilterChipRow } from '@/components/FilterChipRow';
import { Card, Icon, RarityBadge } from '@/components/ui';
import { api } from '@/lib/api';
import { ELEMENT_OPTIONS, RARITY_OPTIONS } from '@/lib/filters';
import { theme } from '@/lib/theme';
import type { WeaponSummary } from '@/lib/types';

export default function WeaponsScreen() {
  const [rarity, setRarity] = useState<string | null>(null);
  const [element, setElement] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <FilterChipRow label="Element" options={ELEMENT_OPTIONS} value={element} onChange={setElement} />
      <FilterChipRow label="Rarity" options={RARITY_OPTIONS} value={rarity} onChange={setRarity} />
      <EntityList<WeaponSummary>
        queryKey={['weapons', rarity, element]}
        fetchPage={(page) =>
          api.weapons({
            page,
            per_page: 50,
            'filter[rarity]': rarity ?? undefined,
            'filter[element]': element ?? undefined,
          })
        }
        keyExtractor={(weapon) => String(weapon.id)}
        renderItem={(weapon) => (
          <Card onPress={() => router.push(`/weapons/${weapon.id}`)}>
            <Icon uri={weapon.icon_url} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>{weapon.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <Text style={{ color: theme.textDim, fontSize: 12 }}>
                  {weapon.wtype} · ATK {weapon.attack}
                </Text>
                <RarityBadge rarity={weapon.rarity} />
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
