import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { DetailContainer } from '@/components/Detail';
import { Icon, Pill, SectionTitle, StatTile } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';

const RESISTANCES = ['fire', 'water', 'thunder', 'ice', 'dragon'] as const;

export default function ArmorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const query = useQuery({ queryKey: ['armor', id], queryFn: () => api.armor(id) });
  const armor = query.data;

  return (
    <DetailContainer title={armor?.name ?? 'Armor'} loading={query.isLoading} error={query.isError}>
      {armor && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Icon uri={armor.icon_url} size={64} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>{armor.name}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <Pill>{armor.slot}</Pill>
                {armor.hunter_type && armor.hunter_type !== 'Both' ? <Pill>{armor.hunter_type}</Pill> : null}
              </View>
            </View>
          </View>

          <SectionTitle>Defense</SectionTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <StatTile label="Defense" value={armor.defense} />
            {armor.max_defense ? <StatTile label="Max" value={armor.max_defense} /> : null}
            <StatTile label="Slots" value={'◯'.repeat(armor.num_slots ?? 0) || '—'} />
          </View>

          <SectionTitle>Resistances</SectionTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {RESISTANCES.map((element) => (
              <StatTile key={element} label={element} value={armor.resistances[element]} />
            ))}
          </View>

          {armor.skill_trees && armor.skill_trees.length > 0 && (
            <>
              <SectionTitle>Skills</SectionTitle>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {armor.skill_trees.map((skill) => (
                  <View
                    key={skill.id}
                    style={{
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ color: theme.text }}>
                      {skill.name}{' '}
                      <Text style={{ color: skill.points && skill.points < 0 ? theme.danger : theme.accent }}>
                        {skill.points && skill.points > 0 ? `+${skill.points}` : skill.points}
                      </Text>
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </>
      )}
    </DetailContainer>
  );
}
