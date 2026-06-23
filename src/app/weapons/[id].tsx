import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { DetailContainer } from '@/components/Detail';
import { Icon, Pill, SectionTitle, StatTile } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';
import type { SharpnessColour } from '@/lib/types';

const SHARPNESS_COLOURS: { key: SharpnessColour; hex: string }[] = [
  { key: 'red', hex: '#d63b3b' },
  { key: 'orange', hex: '#e0822d' },
  { key: 'yellow', hex: '#e3cf2d' },
  { key: 'green', hex: '#46c046' },
  { key: 'blue', hex: '#3f86df' },
  { key: 'white', hex: '#e9e9e9' },
  { key: 'purple', hex: '#c77dff' },
];

function SharpnessBar({ values }: { values: Record<SharpnessColour, number> }) {
  const total = SHARPNESS_COLOURS.reduce((sum, colour) => sum + (values[colour.key] || 0), 0);
  if (total === 0) {
    return null;
  }
  return (
    <View style={{ flexDirection: 'row', height: 12, borderRadius: 3, overflow: 'hidden' }}>
      {SHARPNESS_COLOURS.map((colour) =>
        (values[colour.key] || 0) === 0 ? null : (
          <View key={colour.key} style={{ flex: values[colour.key], backgroundColor: colour.hex }} />
        ),
      )}
    </View>
  );
}

export default function WeaponDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const query = useQuery({ queryKey: ['weapon', id], queryFn: () => api.weapon(id) });
  const weapon = query.data;

  return (
    <DetailContainer title={weapon?.name ?? 'Weapon'} loading={query.isLoading} error={query.isError}>
      {weapon && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Icon uri={weapon.icon_url} size={64} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>{weapon.name}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <Pill>{weapon.wtype}</Pill>
                {weapon.final ? <Pill>Final form</Pill> : null}
              </View>
            </View>
          </View>

          <SectionTitle>Stats</SectionTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <StatTile label="Attack" value={weapon.attack} />
            <StatTile label="Affinity" value={weapon.affinity} />
            {weapon.element ? <StatTile label={weapon.element.type} value={weapon.element.attack ?? '—'} /> : null}
            <StatTile label="Slots" value={'◯'.repeat(weapon.num_slots) || '—'} />
          </View>
          {weapon.sharpness ? (
            <View style={{ marginTop: 12, gap: 8 }}>
              <View>
                <Text style={{ color: theme.textFaint, fontSize: 11, marginBottom: 4 }}>SHARPNESS</Text>
                <SharpnessBar values={weapon.sharpness.normal} />
              </View>
              <View>
                <Text style={{ color: theme.textFaint, fontSize: 11, marginBottom: 4 }}>SHARPNESS +1</Text>
                <SharpnessBar values={weapon.sharpness.plus} />
              </View>
            </View>
          ) : null}
          {weapon.ammo && weapon.ammo.length > 0 ? (
            <>
              <SectionTitle>Ammo</SectionTitle>
              {weapon.ammo.map((round, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}
                >
                  <Text style={{ color: theme.textDim }}>{round.item}</Text>
                  <Text style={{ color: theme.textFaint, fontVariant: ['tabular-nums'] }}>
                    {round.capacity}
                    {round.special ? ` (+${round.special})` : ''}
                  </Text>
                </View>
              ))}
            </>
          ) : null}

          {weapon.melodies && weapon.melodies.length > 0 && (
            <>
              <SectionTitle>Melodies</SectionTitle>
              {weapon.melodies.map((melody, index) => (
                <View
                  key={index}
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
                  <Text style={{ color: theme.text }}>{melody.song}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 12 }}>{melody.duration}</Text>
                </View>
              ))}
            </>
          )}

          {weapon.children && weapon.children.length > 0 && (
            <>
              <SectionTitle>Upgrades into</SectionTitle>
              {weapon.children.map((child) => (
                <Pressable
                  key={child.id}
                  onPress={() => router.push(`/weapons/${child.id}`)}
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ color: theme.text }}>
                    {child.name} <Text style={{ color: theme.textFaint }}>· ATK {child.attack}</Text>
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
