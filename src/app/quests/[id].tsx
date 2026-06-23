import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { DetailContainer } from '@/components/Detail';
import { Icon, Pill, SectionTitle, StatTile } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';

export default function QuestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const query = useQuery({ queryKey: ['quest', id], queryFn: () => api.quest(id) });
  const quest = query.data;

  return (
    <DetailContainer title={quest?.name ?? 'Quest'} loading={query.isLoading} error={query.isError}>
      {quest && (
        <>
          <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>{quest.name}</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Text style={{ color: theme.accent }}>{'★'.repeat(quest.stars)}</Text>
            <Pill>{quest.hub}</Pill>
            <Pill>{quest.type}</Pill>
            {quest.priority ? <Pill>{quest.priority}</Pill> : null}
            {quest.location ? <Pill>{quest.location.name}</Pill> : null}
          </View>

          <Text style={{ color: theme.textDim, marginTop: 14, lineHeight: 20 }}>{quest.goal}</Text>

          <SectionTitle>Rewards & fees</SectionTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <StatTile label="Reward" value={`${quest.reward}z`} />
            <StatTile label="Fee" value={`${quest.fee}z`} />
            {quest.hrp ? <StatTile label="HRP" value={quest.hrp} /> : null}
          </View>

          {quest.monsters && quest.monsters.length > 0 && (
            <>
              <SectionTitle>Monsters</SectionTitle>
              {quest.monsters.map((monster) => (
                <Pressable
                  key={monster.id}
                  onPress={() => router.push(`/monsters/${monster.id}`)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 6,
                  }}
                >
                  <Icon uri={monster.icon_url} size={36} />
                  <Text style={{ color: theme.text }}>{monster.name}</Text>
                </Pressable>
              ))}
            </>
          )}

          {quest.supplies && quest.supplies.length > 0 && (
            <>
              <SectionTitle>Supply items</SectionTitle>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {quest.supplies.map((supply, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}
                  >
                    <Text style={{ color: theme.textDim, fontSize: 13 }}>
                      {supply.item}
                      {supply.quantity && supply.quantity > 1 ? ` ×${supply.quantity}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {quest.rewards &&
            Object.entries(quest.rewards).map(([slot, rewards]) => (
              <View key={slot}>
                <SectionTitle>Rewards · Slot {slot}</SectionTitle>
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
                    <Text style={{ color: theme.textFaint, fontSize: 12 }}>{reward.percentage}%</Text>
                  </Pressable>
                ))}
              </View>
            ))}
        </>
      )}
    </DetailContainer>
  );
}
