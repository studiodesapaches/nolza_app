import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { theme } from '@/src/theme';

type IconSlotProps = {
  icon?: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
};

type Props = {
  leftIcon?: IconSlotProps['icon'];
  rightIcon?: IconSlotProps['icon'];
  onPressLeft?: IconSlotProps['onPress'];
  onPressRight?: IconSlotProps['onPress'];
  leftA11yLabel?: IconSlotProps['accessibilityLabel'];
  rightA11yLabel?: IconSlotProps['accessibilityLabel'];
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

const withIconDefaults = (icon: ReactNode) => {
  if (!React.isValidElement(icon)) return icon;

  return React.cloneElement(icon, {
    ...icon.props,
    size: theme.icons.lg,
    weight: 'bold',
    color: theme.colors.icon.surface.default,
  });
};

const IconSlot: React.FC<IconSlotProps> = ({ icon, onPress, accessibilityLabel }) => {
  if (!icon) {
    return <View style={styles.iconPlaceholder} />;
  }

  const content = <View style={styles.iconWrapper}>{withIconDefaults(icon)}</View>;

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={styles.touchable}
      activeOpacity={0.7}
      hitSlop={8}
    >
      {content}
    </TouchableOpacity>
  );
};

const TopAppBar: React.FC<Props> = ({
  leftIcon,
  rightIcon,
  onPressLeft,
  onPressRight,
  leftA11yLabel,
  rightA11yLabel,
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style as any]}>
      <IconSlot icon={leftIcon} onPress={onPressLeft} accessibilityLabel={leftA11yLabel} />
      <View style={styles.content}>{children}</View>
      <IconSlot icon={rightIcon} onPress={onPressRight} accessibilityLabel={rightA11yLabel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.default,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopAppBar;
