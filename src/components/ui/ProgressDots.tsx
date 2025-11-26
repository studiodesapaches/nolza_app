import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { theme } from '@/src/theme';

type Props = {
  count: number;
  activeIndex: number;
  style?: ViewStyle | ViewStyle[];
  activeColor?: string;
  inactiveColor?: string;
};

const ProgressDots: React.FC<Props> = ({
  count,
  activeIndex,
  style,
  activeColor = theme.colors.text.surface.default,
  inactiveColor = theme.colors.text.surface.secondary,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: count }).map((_, idx) => {
        const isActive = idx === activeIndex;
        return (
          <View
            key={idx}
            style={[
              styles.dotBase,
              isActive ? styles.dotActiveSize : styles.dotInactiveSize,
              { backgroundColor: isActive ? activeColor : inactiveColor },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  dotBase: {
    borderRadius: 999,
  },
  dotActiveSize: {
    width: 16,
    height: 6,
  },
  dotInactiveSize: {
    width: 6,
    height: 6,
  },
});

export default ProgressDots;
