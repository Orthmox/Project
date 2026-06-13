import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScanCard } from '@/components/ScanCard';
import { StatCard } from '@/components/StatCard';
import { getThemeColors, spacing } from '@/constants/theme';
import { useColorScheme } from '@/components/useColorScheme';
import { scanDocuments } from '@/lib/scanner';
import {
  createScanFromImages,
  getRecentScans,
  getScanStats,
} from '@/lib/scanRepository';
import type { ScanRecord, ScanStats } from '@/lib/types';

export default function DashboardScreen() {
  const router = useRouter();
  const colors = getThemeColors(useColorScheme());
  const [stats, setStats] = useState<ScanStats>({ total: 0, thisWeek: 0 });
  const [recentScans, setRecentScans] = useState<ScanRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [scanning, setScanning] = useState(false);

  const loadDashboard = useCallback(async () => {
    const [nextStats, recent] = await Promise.all([
      getScanStats(),
      getRecentScans(5),
    ]);
    setStats(nextStats);
    setRecentScans(recent);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [loadDashboard])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  const handleScan = async () => {
    setScanning(true);
    try {
      const images = await scanDocuments();
      if (!images) {
        return; // user cancelled scanner
      }

      const scan = await createScanFromImages(images);
      await loadDashboard();
      router.push(`/document/${scan.id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to complete scan.';
      Alert.alert('Scan failed', message);
    } finally {
      setScanning(false);
    }
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Scan receipts, notes, and documents with edge detection.
          </Text>
        </View>

        <PrimaryButton
          label="Scan document"
          loading={scanning}
          onPress={handleScan}
        />

        <View style={styles.statsRow}>
          <StatCard label="Total scans" value={stats.total} />
          <StatCard label="This week" value={stats.thisWeek} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Recent scans
        </Text>

        {recentScans.length === 0 ? (
          <EmptyState
            title="No recent scans"
            message="Your latest scans will show up here after you capture a document."
            icon="file-text-o"
          />
        ) : (
          <View style={styles.recentList}>
            {recentScans.map((scan) => (
              <ScanCard
                key={scan.id}
                scan={scan}
                onPress={() => router.push(`/document/${scan.id}`)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: spacing.lg,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  recentList: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});
