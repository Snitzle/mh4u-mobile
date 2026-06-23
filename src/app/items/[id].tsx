import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { DetailContainer } from '@/components/Detail';
import { Icon, Pill, SectionTitle, StatTile } from '@/components/ui';
import { api } from '@/lib/api';
import { theme } from '@/lib/theme';

function SourceRow({ label, meta, onPress }: { label: string; meta: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
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
      <Text style={{ color: theme.text, flex: 1 }}>{label}</Text>
      <Text style={{ color: theme.textFaint, fontSize: 12 }}>{meta}</Text>
    </Pressable>
  );
}

export default function ItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const query = useQuery({ queryKey: ['item', id], queryFn: () => api.item(id) });
  const item = query.data;

  return (
    <DetailContainer title={item?.name ?? 'Item'} loading={query.isLoading} error={query.isError}>
      {item && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Icon uri={item.icon_url} size={56} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 22, fontWeight: '800' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
                <Pill>{item.type}</Pill>
                {item.rarity > 0 ? <Pill>Rarity {item.rarity}</Pill> : null}
              </View>
            </View>
          </View>

          {item.description ? (
            <Text style={{ color: theme.textDim, marginTop: 14, lineHeight: 20 }}>{item.description}</Text>
          ) : null}

          <SectionTitle>Details</SectionTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <StatTile label="Buy" value={item.buy ? `${item.buy}z` : '—'} />
            <StatTile label="Sell" value={item.sell ? `${item.sell}z` : '—'} />
            <StatTile label="Carry" value={item.carry_capacity} />
          </View>

          {item.monster_rewards && item.monster_rewards.length > 0 && (
            <>
              <SectionTitle>Carve / Capture from</SectionTitle>
              {item.monster_rewards.map((reward, index) => (
                <SourceRow
                  key={index}
                  label={reward.monster?.name ?? '—'}
                  meta={`${reward.rank} · ${reward.percentage}%`}
                  onPress={() => reward.monster && router.push(`/monsters/${reward.monster.id}`)}
                />
              ))}
            </>
          )}

          {item.gathering && item.gathering.length > 0 && (
            <>
              <SectionTitle>Gather at</SectionTitle>
              {item.gathering.map((spot, index) => (
                <SourceRow key={index} label={spot.location?.name ?? spot.area} meta={`${spot.rank} · ${spot.area}`} />
              ))}
            </>
          )}

          {item.components_required && item.components_required.length > 0 && (
            <>
              <SectionTitle>Crafted from</SectionTitle>
              {item.components_required.map((component, index) => (
                <SourceRow
                  key={index}
                  label={component.component_item?.name ?? '—'}
                  meta={`×${component.quantity}`}
                  onPress={() => component.component_item && router.push(`/items/${component.component_item.id}`)}
                />
              ))}
            </>
          )}

          {item.used_in && item.used_in.length > 0 && (
            <>
              <SectionTitle>Used to craft</SectionTitle>
              {item.used_in.map((component, index) => (
                <SourceRow
                  key={index}
                  label={component.created_item?.name ?? '—'}
                  meta={`×${component.quantity}`}
                  onPress={() => component.created_item && router.push(`/items/${component.created_item.id}`)}
                />
              ))}
            </>
          )}
        </>
      )}
    </DetailContainer>
  );
}
