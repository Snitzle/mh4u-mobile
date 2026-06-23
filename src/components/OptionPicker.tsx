import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { FilterOption } from '@/lib/filters';
import { theme } from '@/lib/theme';

interface Props {
  label: string;
  title: string;
  placeholder: string;
  value: string | null;
  options: FilterOption[];
  onChange: (value: string | null) => void;
}

/** A labelled button that opens a searchable modal list to pick one option. */
export function OptionPicker({ label, title, placeholder, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = options.find((option) => option.value === value);

  const filtered = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(search.trim().toLowerCase())),
    [options, search],
  );

  const choose = (next: string | null) => {
    onChange(next);
    setOpen(false);
    setSearch('');
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.buttonText} numberOfLines={1}>
          {selected?.label ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={theme.textDim} />
      </Pressable>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={() => setOpen(false)} hitSlop={12}>
              <Ionicons name="close" size={24} color={theme.text} />
            </Pressable>
          </View>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search…"
            placeholderTextColor={theme.textFaint}
            autoCorrect={false}
            style={styles.search}
          />

          <FlatList
            data={filtered}
            keyExtractor={(option) => option.value}
            ListHeaderComponent={
              <Pressable onPress={() => choose(null)} style={styles.option}>
                <Text style={[styles.optionText, { color: theme.accent }]}>{placeholder}</Text>
              </Pressable>
            }
            renderItem={({ item }) => (
              <Pressable onPress={() => choose(item.value)} style={styles.option}>
                <Text style={styles.optionText}>{item.label}</Text>
                {item.value === value && <Ionicons name="checkmark" size={18} color={theme.accent} />}
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 6 },
  label: { color: theme.textFaint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', width: 56 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    flex: 1,
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  buttonText: { color: theme.text, fontSize: 14, flex: 1 },
  modal: { flex: 1, backgroundColor: theme.bg, paddingTop: 60 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  modalTitle: { color: theme.text, fontSize: 18, fontWeight: '800' },
  search: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: theme.surface,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: theme.text,
    fontSize: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomColor: theme.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: { color: theme.text, fontSize: 16 },
});
