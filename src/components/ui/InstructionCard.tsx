import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';
import { DiceThree, Lego } from 'phosphor-react-native';

import { theme } from '@/src/theme';
import AppText from './AppText';

export type InstructionCardProps = {
  title: string;
  description: string[];
  stepNumber: number;
  totalSteps: number;
  image?: ImageSourcePropType;
  style?: ViewStyle | ViewStyle[];
};

const InstructionCard: React.FC<InstructionCardProps> = ({
  title,
  description,
  stepNumber,
  totalSteps,
  image,
  style,
}) => {
  const icon =
    title.toLowerCase().includes('setup') ? withIconDefaults(<Lego />) : withIconDefaults(<DiceThree />);

  return (
    <View style={[styles.card, style as any]}>
      <View style={styles.header}>
        <View style={styles.icon}>{icon}</View>
        <AppText variant="title-sm" tone="surface">
          {title}
        </AppText>
        <AppText variant="body-lg" tone="surfaceSecondary" style={styles.stepCount}>
          {stepNumber}/{totalSteps}
        </AppText>
      </View>
      {image ? <Image source={image} style={styles.image} resizeMode="contain" /> : null}
      <View style={styles.copy}>
        {description.map((paragraph, index) => (
          <AppText key={index} variant="body-md" tone="surfaceSecondary">
            {paragraph}
          </AppText>
        ))}
      </View>
    </View>
  );
};

const withIconDefaults = (icon: React.ReactNode) => {
  if (!React.isValidElement(icon)) return icon;
  return React.cloneElement(icon, {
    ...icon.props,
    size: theme.icons.md,
    weight: 'bold',
    color: theme.colors.icon.surface.default,
  });
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background.secondary,
    gap: 16,
    width: 300,
    height: 440,
    flexShrink: 0,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCount: {
    marginLeft: 'auto',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: theme.radius.sm,
  },
  copy: {
    flexDirection: 'column',
    gap: 12,
    alignSelf: 'stretch',
  },
});

export default InstructionCard;
