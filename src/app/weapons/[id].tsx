import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { DetailContainer } from '@/components/Detail';
import { Icon, Pill, SectionTitle, StatTile } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';

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
            <Text style={{ color: theme.textDim, marginTop: 12 }}>Sharpness: {weapon.sharpness}</Text>
          ) : null}
          {weapon.ammo ? <Text style={{ color: theme.textDim, marginTop: 8 }}>Ammo: {weapon.ammo}</Text> : null}

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
