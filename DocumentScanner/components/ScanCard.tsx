import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getThemeColors, radii, spacing } from '@/constants/theme';
import { useColorScheme } from '@/components/useColorScheme';
import type { ScanRecord } from '@/lib/types';

type Props = {
  scan: ScanRecord;
  onPress: () => void;
  onLongPress?: () => void;
};

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ScanCard({ scan, onPress, onLongPress }: Props) {
  const colors = getThemeColors(useColorScheme());

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}>
      <Image
        contentFit="cover"
        source={{ uri: scan.thumbnail_uri }}
        style={[styles.thumbnail, { backgroundColor: colors.border }]}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
          {scan.title}
        </Text>
        <Text style={[styles.meta, { color: colors.muted }]}>
          {formatDate(scan.created_at)} · {scan.page_count}{' '}
          {scan.page_count === 1 ? 'page' : 'pages'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  meta: {
    fontSize: 13,
  },
  thumbnail: {
    borderRadius: radii.sm,
    height: 64,
    width: 48,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
