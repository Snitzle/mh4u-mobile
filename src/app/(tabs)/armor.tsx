import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { Card, Icon, RarityBadge } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';
import type { ArmorSummary } from '@/lib/types';

export default function ArmorScreen() {
  return (
    <EntityList<ArmorSummary>
      queryKey={['armor']}
      fetchPage={(page) => api.armorList({ page, per_page: 50 })}
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
  );
}
