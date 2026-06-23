import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RARITY_COLORS, theme } from '@/lib/theme';

export function Icon({ uri, size = 44 }: { uri: string | null; size?: number }) {
  if (!uri) {
    return (
      <View style={[styles.iconFallback, { width: size, height: size }]}>
        <Text style={{ color: theme.textFaint }}>?</Text>
      </View>
    );
  }
  return (
    <Image source={uri} style={{ width: size, height: size, borderRadius: 8 }} contentFit="contain" transition={150} />
  );
}

export function Card({ children, onPress }: { children: ReactNode; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && onPress ? { opacity: 0.7 } : null]}
    >
      {children}
    </Pressable>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{children}</Text>
    </View>
  );
}

export function RarityBadge({ rarity }: { rarity: number | null }) {
  if (rarity === null) return null;
  const color = RARITY_COLORS[Math.min(rarity, RARITY_COLORS.length - 1)] ?? theme.textDim;
  return (
    <View style={[styles.rarity, { backgroundColor: `${color}22` }]}>
      <Text style={[styles.rarityText, { color }]}>Rare {rarity}</Text>
    </View>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.section}>{children}</Text>;
}

export function StatTile({ label, value }: { label: string; value: ReactNode }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={styles.tileValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  iconFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surfaceHi,
    borderRadius: 8,
  },
  pill: {
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  pillText: { color: theme.textDim, fontSize: 12 },
  rarity: { borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2 },
  rarityText: { fontSize: 11, fontWeight: '700' },
  section: {
    color: theme.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 10,
  },
  tile: {
    flex: 1,
    minWidth: 70,
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tileLabel: { color: theme.textFaint, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  tileValue: { color: theme.text, fontSize: 17, fontWeight: '700', marginTop: 2 },
});
