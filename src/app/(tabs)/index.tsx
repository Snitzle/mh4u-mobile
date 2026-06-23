import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { EntityList } from '@/components/EntityList';
import { Card, Icon } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';
import type { MonsterSummary } from '@/lib/types';

export default function MonstersScreen() {
  return (
    <EntityList<MonsterSummary>
      queryKey={['monsters']}
      fetchPage={(page) => api.monsters({ page, per_page: 50 })}
      keyExtractor={(monster) => String(monster.id)}
      renderItem={(monster) => (
        <Card onPress={() => router.push(`/monsters/${monster.id}`)}>
          <Icon uri={monster.icon_url} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>{monster.name}</Text>
            <Text style={{ color: theme.textDim, fontSize: 12 }}>{monster.class}</Text>
          </View>
        </Card>
      )}
    />
  );
}
