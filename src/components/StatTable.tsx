import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/lib/theme';

interface Props {
  /** Column headers; the first is the row-label column. */
  columns: string[];
  /** Each row's cells, aligned to `columns` (first cell is the row label). */
  rows: (string | number)[][];
}

/** A compact, horizontally-scrollable data table for hitzones / status tolerances. */
export function StatTable({ columns, rows }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          {columns.map((col, index) => (
            <Text key={col} style={[styles.cell, index === 0 ? styles.labelCell : styles.valueCell, styles.headerText]}>
              {col}
            </Text>
          ))}
        </View>
        {rows.map((cells, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {cells.map((value, index) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  index === 0 ? styles.labelCell : styles.valueCell,
                  index === 0 ? styles.labelText : styles.valueText,
                ]}
              >
                {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', borderTopColor: theme.border, borderTopWidth: StyleSheet.hairlineWidth },
  headerRow: { backgroundColor: theme.surfaceHi, borderTopWidth: 0 },
  cell: { paddingHorizontal: 10, paddingVertical: 8, fontSize: 13 },
  labelCell: { width: 84 },
  valueCell: { width: 56, textAlign: 'right' },
  headerText: { color: theme.textFaint, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  labelText: { color: theme.text, fontWeight: '600' },
  valueText: { color: theme.textDim, fontVariant: ['tabular-nums'] },
});
