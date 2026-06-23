import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { DetailContainer, Dots } from '@/components/Detail';
import { StatTable } from '@/components/StatTable';
import { Icon, Pill, SectionTitle } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';

const ELEMENTS = ['fire', 'water', 'thunder', 'ice', 'dragon'] as const;
const AILMENTS = ['poison', 'paralysis', 'sleep'] as const;
const TRAPS = ['pitfall_trap', 'shock_trap', 'flash_bomb', 'sonic_bomb', 'dung_bomb', 'meat'] as const;

const cell = (value: number | null): string => (value === null || value < 0 ? '—' : String(value));

function RatingRow({ items }: { items: { label: string; value: number }[] }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 14, rowGap: 6 }}>
      {items.map(({ label, value }) => (
        <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={{ color: theme.textFaint, fontSize: 12, textTransform: 'capitalize' }}>
            {label.replace('_', ' ')}
          </Text>
          <Dots value={value} />
        </View>
      ))}
    </View>
  );
}

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

          {monster.ailments && monster.ailments.length > 0 && (
            <>
              <SectionTitle>Inflicts</SectionTitle>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {monster.ailments.map((ailment) => (
                  <Pill key={ailment}>{ailment}</Pill>
                ))}
              </View>
            </>
          )}

          {monster.weaknesses?.map((weakness) => (
            <View key={weakness.state}>
              <SectionTitle>Effectiveness · {weakness.state}</SectionTitle>
              <View style={{ gap: 10 }}>
                <RatingRow items={ELEMENTS.map((e) => ({ label: e, value: weakness.elements[e] }))} />
                <RatingRow items={AILMENTS.map((a) => ({ label: a, value: weakness.ailments[a] }))} />
                <RatingRow items={TRAPS.map((t) => ({ label: t, value: weakness.traps?.[t] ?? 0 }))} />
              </View>
            </View>
          ))}

          {monster.damage && monster.damage.length > 0 && (
            <>
              <SectionTitle>Hitzones</SectionTitle>
              <StatTable
                columns={['Part', 'Cut', 'Impact', 'Shot', 'Fire', 'Water', 'Ice', 'Thunder', 'Dragon', 'KO']}
                rows={monster.damage.map((z) => [
                  z.body_part,
                  cell(z.cut), cell(z.impact), cell(z.shot),
                  cell(z.fire), cell(z.water), cell(z.ice), cell(z.thunder), cell(z.dragon),
                  cell(z.ko),
                ])}
              />
            </>
          )}

          {monster.statuses && monster.statuses.length > 0 && (
            <>
              <SectionTitle>Status tolerance</SectionTitle>
              <StatTable
                columns={['Status', 'Init', 'Build', 'Max', 'Dur', 'Dmg']}
                rows={monster.statuses.map((s) => [
                  s.status,
                  cell(s.initial), cell(s.increase), cell(s.max),
                  s.duration ? `${s.duration}s` : '—',
                  s.damage || '—',
                ])}
              />
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
              {Array.from(new Map(monster.quests.map((q) => [q.id, q])).values()).map((quest) => (
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
