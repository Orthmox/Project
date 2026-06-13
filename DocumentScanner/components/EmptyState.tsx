import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

import { getThemeColors, spacing } from '@/constants/theme';
import { useColorScheme } from '@/components/useColorScheme';

type Props = {
  title: string;
  message: string;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
};

export function EmptyState({
  title,
  message,
  icon = 'folder-open-o',
}: Props) {
  const colors = getThemeColors(useColorScheme());

  return (
    <View style={styles.container}>
      <FontAwesome name={icon} size={40} color={colors.muted} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.muted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
