import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { FilterOption } from '@/lib/filters';
import { theme } from '@/lib/theme';

interface Props {
  label: string;
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export function FilterChipRow({ label, options, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip active={value === null} label="All" onPress={() => onChange(null)} />
        {options.map((option) => (
          <Chip
            key={option.value}
            active={value === option.value}
            label={option.label}
            onPress={() => onChange(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Chip({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}>
      <Text style={[styles.chipText, active ? styles.chipTextActive : styles.chipTextIdle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 16, paddingVertical: 6 },
  label: { color: theme.textFaint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', width: 56 },
  chips: { gap: 8, paddingRight: 16 },
  chip: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1 },
  chipActive: { backgroundColor: theme.accent, borderColor: theme.accent },
  chipIdle: { backgroundColor: 'transparent', borderColor: theme.border },
  chipText: { fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#000' },
  chipTextIdle: { color: theme.textDim },
});
