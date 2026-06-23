import { Stack } from 'expo-router';
import type { ReactNode } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/lib/theme';

export function DetailContainer({
  title,
  loading,
  error,
  children,
}: {
  title: string;
  loading: boolean;
  error: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <Stack.Screen options={{ title }} />
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={theme.accent} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={{ color: theme.danger }}>Couldn’t load this.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
      )}
    </>
  );
}

export function Dots({ value }: { value: number }) {
  return (
    <Text style={{ fontSize: 13, letterSpacing: 1 }}>
      {[0, 1, 2].map((i) => (
        <Text key={i} style={{ color: i < value ? theme.accent : 'rgba(255,255,255,0.15)' }}>
          ●
        </Text>
      ))}
    </Text>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  content: { padding: 16, paddingBottom: 48 },
});
