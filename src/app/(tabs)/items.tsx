import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { Card, Icon, RarityBadge } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';
import type { ItemSummary } from '@/lib/types';

export default function ItemsScreen() {
  return (
    <EntityList<ItemSummary>
      queryKey={['items']}
      fetchPage={(page) => api.items({ page, per_page: 50, sort: 'name' })}
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
  );
}
