import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Plus } from 'phosphor-react-native';

import { theme } from '@/src/theme';
import AppText from './AppText';

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
};

/**
 * LargeCard matches the Figma spec for the large surface cards.
 * - 336px wide, 20px padding, 24px gap
 * - Surface secondary background and small radius
 * - Icon/image centered, text left-aligned across the full width
 */
const LargeCard: React.FC<Props> = ({ title, description, icon, onPress, style }) => {
  const Container: any = onPress ? TouchableOpacity : View;
  const resolvedIcon =
    icon ?? <Plus size={theme.icons.xxl} color={theme.colors.icon.surface.default} weight="light" />;

  return (
    <Container style={[styles.card, style as any]} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.icon}>{resolvedIcon}</View>
      <View style={styles.textWrap}>
        <AppText variant="label-md" tone="surface">
          {title}
        </AppText>
        {description ? (
          <AppText variant="body-sm" tone="surfaceSecondary" style={styles.description}>
            {description}
          </AppText>
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: 336,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background.secondary,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
    alignSelf: 'stretch',
    width: '100%',
  },
  description: {
    textAlign: 'left',
  },
});

export default LargeCard;
