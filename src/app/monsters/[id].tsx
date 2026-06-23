import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { DetailContainer, Dots } from '@/components/Detail';
import { Icon, Pill, SectionTitle } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';

const ELEMENTS = ['fire', 'water', 'thunder', 'ice', 'dragon'] as const;

export default function MonsterDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const query = useQuery({ queryKey: ['monster', id], queryFn: () => api.monster(id) });
  const monster = query.data;

  return (
    <DetailContainer title={monster?.name ?? 'Monster'} loading={query.isLoading} error={query.isError}>
      {monster && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Icon uri={monster.icon_url} size={64} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>{monster.name}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <Pill>{monster.class}</Pill>
                {monster.trait ? <Pill>{monster.trait}</Pill> : null}
              </View>
            </View>
          </View>

          {monster.weaknesses && monster.weaknesses.length > 0 && (
            <>
              <SectionTitle>Weaknesses</SectionTitle>
              {monster.weaknesses.map((weakness) => (
                <View
                  key={weakness.state}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: theme.textDim, fontWeight: '600', marginBottom: 8 }}>
                    {weakness.state}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
                    {ELEMENTS.map((element) => (
                      <View key={element} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={{ color: theme.textFaint, fontSize: 12, textTransform: 'capitalize', width: 52 }}>
                          {element}
                        </Text>
                        <Dots value={weakness.elements[element]} />
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}

          {monster.hunting_rewards &&
            Object.entries(monster.hunting_rewards).map(([rank, rewards]) => (
              <View key={rank}>
                <SectionTitle>Rewards · {rank}</SectionTitle>
                {rewards.map((reward, index) => (
                  <Pressable
                    key={index}
                    onPress={() => reward.item && router.push(`/items/${reward.item.id}`)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      marginBottom: 6,
                    }}
                  >
                    <Text style={{ color: theme.text, flex: 1 }}>{reward.item?.name ?? '—'}</Text>
                    <Text style={{ color: theme.textFaint, fontSize: 12 }}>
                      {reward.condition} · {reward.percentage}%
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}

          {monster.quests && monster.quests.length > 0 && (
            <>
              <SectionTitle>Appears in quests</SectionTitle>
              {monster.quests.map((quest) => (
                <Pressable
                  key={quest.id}
                  onPress={() => router.push(`/quests/${quest.id}`)}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ color: theme.text }}>{quest.name}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 12, marginTop: 2 }}>
                    {'★'.repeat(quest.stars)} · {quest.hub}
                  </Text>
                </Pressable>
              ))}
            </>
          )}
        </>
      )}
    </DetailContainer>
  );
}
