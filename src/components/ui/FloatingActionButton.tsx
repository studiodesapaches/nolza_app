import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Plus } from 'phosphor-react-native';

import { theme } from '@/src/theme';

type Props = {
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
};

const FloatingActionButton: React.FC<Props> = ({ onPress, icon, style, disabled }) => {
  const resolvedIcon =
    icon === undefined
      ? (
        <Plus
          size={theme.icons.lg}
          color={theme.colors.icon.surface.default}
          weight="bold"
        />
      )
      : icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.disabled, style as any]}
      disabled={disabled}
    >
      <View style={styles.icon}>{resolvedIcon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary.default,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.drop,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default FloatingActionButton;
