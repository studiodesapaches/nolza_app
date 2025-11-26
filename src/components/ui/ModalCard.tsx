import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';

import { Plus } from 'phosphor-react-native';

import AppText from './AppText';
import PrimaryButton from './PrimaryButton';
import { theme } from '@/src/theme';

type Props = {
  title: string;
  description: string;
  ctaLabel: string;
  onPressCta?: () => void;
  imageSource: ImageSourcePropType;
  style?: ViewStyle | ViewStyle[];
};

const ModalCard: React.FC<Props> = ({ title, description, ctaLabel, onPressCta, imageSource, style }) => {
  return (
    <View style={[styles.container, style as any]}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.textBlock}>
        <AppText variant="title-md" tone="surface">
          {title}
        </AppText>
        <AppText variant="body-md" tone="surfaceSecondary">
          {description}
        </AppText>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={ctaLabel}
          onPress={onPressCta}
          icon={null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 324,
    height: 440,
    padding: 20,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.radius.sm,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    aspectRatio: 71 / 40,
    alignSelf: 'stretch',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  textBlock: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
});

export default ModalCard;
