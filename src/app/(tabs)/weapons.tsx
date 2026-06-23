import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { Card, Icon, RarityBadge } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';
import type { WeaponSummary } from '@/lib/types';

export default function WeaponsScreen() {
  return (
    <EntityList<WeaponSummary>
      queryKey={['weapons']}
      fetchPage={(page) => api.weapons({ page, per_page: 50 })}
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
  );
}
