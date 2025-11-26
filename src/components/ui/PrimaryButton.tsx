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

const PrimaryButton: React.FC<Props> = ({ title, onPress, icon, style, disabled }) => {
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
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
});

export default PrimaryButton;
