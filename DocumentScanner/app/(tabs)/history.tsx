import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { ScanCard } from '@/components/ScanCard';
import { getThemeColors, spacing } from '@/constants/theme';
import { useColorScheme } from '@/components/useColorScheme';
import { deleteScan, getAllScans } from '@/lib/scanRepository';
import type { ScanRecord } from '@/lib/types';

export default function HistoryScreen() {
  const router = useRouter();
  const colors = getThemeColors(useColorScheme());
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadScans = useCallback(async () => {
    const records = await getAllScans();
    setScans(records);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadScans();
    }, [loadScans])
  );

  const filteredScans = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return scans;
    return scans.filter((scan) => scan.title.toLowerCase().includes(trimmed));
  }, [query, scans]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadScans();
    setRefreshing(false);
  };

  const confirmDelete = (scan: ScanRecord) => {
    Alert.alert('Delete scan', `Remove "${scan.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteScan(scan.id);
          await loadScans();
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>History</Text>
        <TextInput
          placeholder="Search by title"
          placeholderTextColor={colors.muted}
          style={[
            styles.search,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={filteredScans}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No scans yet"
            message="Scanned documents will appear here. Start from the Dashboard tab."
            icon="history"
          />
        }
        renderItem={({ item }) => (
          <ScanCard
            scan={item}
            onPress={() => router.push(`/document/${item.id}`)}
            onLongPress={() => confirmDelete(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  list: {
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  search: {
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});
