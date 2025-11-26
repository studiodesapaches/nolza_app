import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { UsersThree } from 'phosphor-react-native';

import { theme } from '@/src/theme';
import AppText from './AppText';

type Props = {
  title: string;
  description: string;
  playersCount?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

const GameLibraryCard: React.FC<Props> = ({ title, description, playersCount, onPress, style }) => {
  const disabled = !onPress;

  return (
    <TouchableOpacity
      style={[styles.card, style as any]}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.headerRow}>
        <AppText variant="label-lg" tone="surface" style={styles.title}>
          {title}
        </AppText>
        <View style={styles.playersRow}>
          <UsersThree
            size={theme.icons.sm}
            weight="regular"
            color={theme.colors.icon.surface.secondary}
          />
          <AppText variant="body-sm" tone="surfaceSecondary">
            {playersCount ?? '--'}
          </AppText>
        </View>
      </View>
      <AppText variant="body-sm" tone="surfaceSecondary">
        {description}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background.secondary,
    alignSelf: 'stretch',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flexShrink: 0,
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default GameLibraryCard;
