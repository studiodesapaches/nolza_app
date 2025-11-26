import React from 'react';
import { GestureResponderEvent, StyleSheet, View, ViewStyle } from 'react-native';

import { theme } from '@/src/theme';
import { OutlinedButton } from '@/src/components';

import AppText from './AppText';

type Props = {
  onPress?: (e: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
};

const ResponsibleDrinkingBanner: React.FC<Props> = ({ onPress, style }) => {
  return (
    <View style={[styles.container, style as any]}>
      <AppText variant="title-md" tone="surface" style={styles.title}>
        Drink Responsibly and Mindfully
      </AppText>
      <View style={styles.copyGroup}>
        <AppText variant="body-md" tone="surfaceSecondary" style={styles.copy}>
          Social drinking should always be safe, respectful, and enjoyable for everyone.
        </AppText>
        <AppText variant="body-md" tone="surfaceSecondary" style={styles.copy}>
          For full guidance, please see our Guidelines for Responsible and Mindful Social Drinking.
        </AppText>
      </View>
      <OutlinedButton title="View guidelines" onPress={onPress} icon={null} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    alignSelf: 'stretch',
    paddingVertical: 24,
    paddingHorizontal: 12,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background.default,
  },
  title: {
    textAlign: 'center',
  },
  copyGroup: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
  },
  copy: {
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
  },
});

export default ResponsibleDrinkingBanner;
