import { useInfiniteQuery } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/lib/theme';
import type { Paginated } from '@/lib/types';

interface Props<T> {
  queryKey: unknown[];
  fetchPage: (page: number) => Promise<Paginated<T>>;
  renderItem: (item: T) => ReactElement;
  keyExtractor: (item: T) => string;
  header?: ReactElement;
}

export function EntityList<T>({ queryKey, fetchPage, renderItem, keyExtractor, header }: Props<T>) {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.meta.current_page < last.meta.last_page ? last.meta.current_page + 1 : undefined,
  });

  if (query.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={theme.accent} />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Couldn’t reach the API.</Text>
        <Text style={styles.errorHint}>Make sure mh4u-api is running on port 8088.</Text>
      </View>
    );
  }

  const items = query.data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => renderItem(item)}
      ListHeaderComponent={header}
      contentContainerStyle={styles.content}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
      }}
      ListFooterComponent={
        query.isFetchingNextPage ? <ActivityIndicator color={theme.accent} style={{ marginVertical: 16 }} /> : null
      }
      refreshControl={
        <RefreshControl refreshing={query.isRefetching} onRefresh={query.refetch} tintColor={theme.accent} />
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 6 },
  content: { padding: 16, gap: 10 },
  error: { color: theme.danger, fontSize: 16, fontWeight: '600' },
  errorHint: { color: theme.textFaint, fontSize: 13, textAlign: 'center' },
});
