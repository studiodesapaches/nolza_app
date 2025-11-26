import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, GestureResponderEvent } from 'react-native';

import { theme } from '@/src/theme';
import { Plus } from 'phosphor-react-native';

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
};

const OutlinedButton: React.FC<Props> = ({ title, onPress, icon, style, disabled }) => {
  const resolvedIcon =
    icon === undefined
      ? <Plus size={theme.icons.md} color={theme.colors.icon.surface.default} weight="bold" />
      : icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.disabled, style as any]}
      disabled={disabled}
    >
      {resolvedIcon ? <View style={styles.icon}>{resolvedIcon}</View> : null}
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.background.default,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: theme.stroke.md,
    borderColor: theme.colors.stroke.surface.default,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: theme.colors.text.surface.default,
    fontFamily: theme.typography.text.label.md.fontFamily,
    fontSize: theme.typography.text.label.md.fontSize,
    fontWeight: theme.typography.text.label.md.fontWeight as any,
    lineHeight: theme.typography.text.label.md.lineHeight,
  },
});

export default OutlinedButton;
