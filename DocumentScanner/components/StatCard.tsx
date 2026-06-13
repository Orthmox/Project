import { StyleSheet, Text, View } from 'react-native';

import { getThemeColors, radii, spacing } from '@/constants/theme';
import { useColorScheme } from '@/components/useColorScheme';

type Props = {
  label: string;
  value: number | string;
};

export function StatCard({ label, value }: Props) {
  const colors = getThemeColors(useColorScheme());

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    padding: spacing.md,
  },
  label: {
    fontSize: 13,
    marginTop: spacing.xs,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
});
