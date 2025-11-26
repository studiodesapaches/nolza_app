import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, GestureResponderEvent } from 'react-native';

import { theme } from '@/src/theme';
import AppText from './AppText';
import { Plus } from 'phosphor-react-native';

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
};

const SmallCard: React.FC<Props> = ({ title, description, icon, onPress, style }) => {
  const Container: any = onPress ? TouchableOpacity : View;
  const resolvedIcon =
    icon ?? <Plus size={theme.icons.xl} color={theme.colors.icon.surface.default} weight="light" />;

  return (
    <Container onPress={onPress} style={[styles.card, style as any]} activeOpacity={0.8}>
      <AppText variant="label-md" tone="surface" style={styles.title}>
        {title}
      </AppText>
      {resolvedIcon ? <View style={styles.icon}>{resolvedIcon}</View> : null}
      {description ? (
        <AppText variant="body-sm" tone="surfaceSecondary" style={styles.description}>
          {description}
        </AppText>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 162,
    height: 180,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background.secondary,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export default SmallCard;
