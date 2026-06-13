import Colors from './Colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export function getThemeColors(scheme: 'light' | 'dark' | null | undefined) {
  const mode = scheme === 'dark' ? 'dark' : 'light';
  const palette = Colors[mode];
  return {
    ...palette,
    card: mode === 'dark' ? '#1c1c1e' : '#f2f2f7',
    border: mode === 'dark' ? '#38383a' : '#e5e5ea',
    muted: mode === 'dark' ? '#8e8e93' : '#6c6c70',
    primary: '#2563eb',
    primaryText: '#ffffff',
    danger: '#dc2626',
  };
}

export type ThemeColors = ReturnType<typeof getThemeColors>;
