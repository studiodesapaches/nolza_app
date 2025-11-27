import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { CaretLeft, X } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

import { AppText, OutlinedButton, PrimaryButton, ProgressDots, Screen, TopAppBar } from '@/src/components';
import { theme } from '@/src/theme';
import { trackEvent } from '@/lib/analytics';

type Slide = {
  id: string;
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta?: string;
  onSecondaryPress?: () => void;
  illustration?: React.ReactNode;
};

type Props = {
  onComplete: () => Promise<void>;
  onClose?: () => void;
};

const onboardingImages = {
  welcome: require('../../../assets/onboarding/onboarding-welcome.png'),
  culture: require('../../../assets/onboarding/onboarding-culture.png'),
  everyone: require('../../../assets/onboarding/onboarding-everyone.png'),
  phone: require('../../../assets/onboarding/onboarding-phone.png'),
  responsibly: require('../../../assets/onboarding/onboarding-responsibly.png'),
};

const OnboardingScreen: React.FC<Props> = ({ onComplete, onClose }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [prevIndex, setPrevIndex] = useState(0);
  const completedSteps = useRef<Set<number>>(new Set());
  const hasFiredCompletion = useRef(false);

  const slides: Slide[] = useMemo(
    () => [
      {
        id: 'welcome',
        title: 'Welcome to Nolza',
        body:
          'Discover, learn, and play popular group drinking games from around the world — anytime, anywhere — all in one place.',
        primaryCta: 'Continue',
        illustration: <Image source={onboardingImages.welcome} style={styles.illustrationImage} />,
      },
      {
        id: 'culture',
        title: 'Inspired by Korea’s lively nightlife culture',
        body:
          'Korea has a unique set of games that people know by heart and play anywhere — at home, in bars, or on trips.\n\nThese games help break the ice with new friends and create lasting memories with close ones.',
        primaryCta: 'Continue',
        illustration: <Image source={onboardingImages.culture} style={styles.illustrationImage} />,
      },
      {
        id: 'everyone',
        title: 'Nolza opens this experience to everyone',
        body:
          'We’ve brought together Korean classics with global favorites that fit the same spirit of shared fun.\n\nCan’t remember the rules? Don’t know many games? Nolza makes it easy to discover, learn, and play together.',
        primaryCta: 'Continue',
        illustration: <Image source={onboardingImages.everyone} style={styles.illustrationImage} />,
      },
      {
        id: 'phone',
        title: 'All you need is your phone',
        body:
          'Gather your friends, take turns choosing a game from Nolza’s extensive library (or let the app pick one for you), and start the fun.',
        primaryCta: 'Continue',
        illustration: <Image source={onboardingImages.phone} style={styles.illustrationImage} />,
      },
      {
        id: 'responsibly',
        title: 'Drink responsibly and mindfully',
        body:
          'Social drinking should always be safe, respectful, and enjoyable for everyone.\n\nFor full guidance, please see our Guidelines for Responsible and Mindful Social Drinking.',
        primaryCta: 'Continue',
        secondaryCta: 'View guidelines',
        onSecondaryPress: () => router.push('/guidelines'),
        illustration: <Image source={onboardingImages.responsibly} style={styles.illustrationImage} />,
      },
    ],
    [router]
  );

  const isLastSlide = index === slides.length - 1;
  const currentSlide = slides[index];

  useEffect(() => {
    if (index === prevIndex) return;

    const direction = index > prevIndex ? 1 : -1;
    slideAnim.setValue(direction * width);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();

    setPrevIndex(index);
  }, [index, prevIndex, slideAnim, width]);

  const handleNext = async () => {
    const stepNumber = index + 1;
    if (!completedSteps.current.has(stepNumber)) {
      trackEvent('onboarding_step_completed', { step_number: stepNumber });
      completedSteps.current.add(stepNumber);
    }

    if (isLastSlide) {
      if (!hasFiredCompletion.current) {
        hasFiredCompletion.current = true;
        trackEvent('onboarding_completed');
      }
      await onComplete();
      return;
    }
    setIndex((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const handleBack = () => {
    if (index === 0) return;
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const showBack = index > 0;
  const showClose = Boolean(onClose);

  return (
    <Screen background="default" style={styles.screen}>
      <TopAppBar
        leftIcon={showBack ? <CaretLeft /> : undefined}
        onPressLeft={showBack ? handleBack : undefined}
        leftA11yLabel={showBack ? 'Go back' : undefined}
        rightIcon={showClose ? <X /> : undefined}
        onPressRight={showClose ? onClose : undefined}
        rightA11yLabel={showClose ? 'Close onboarding' : undefined}
        style={styles.topBar}
      />
      <Animated.View style={[styles.content, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.illustrationContainer}>
          {currentSlide.illustration ?? null}
        </View>

        <View style={styles.copyContainer}>
          <AppText variant="display-sm" tone="surface" style={styles.title}>
            {currentSlide.title}
          </AppText>
          <AppText variant="body-lg" tone="surfaceSecondary" style={styles.body}>
            {currentSlide.body}
          </AppText>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        {currentSlide.secondaryCta ? (
          <OutlinedButton
            title={currentSlide.secondaryCta}
            onPress={currentSlide.onSecondaryPress}
            icon={null}
            style={styles.button}
          />
        ) : null}
        <PrimaryButton title={currentSlide.primaryCta} onPress={handleNext} icon={null} style={styles.button} />

        <ProgressDots count={slides.length} activeIndex={index} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background.default,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 56,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    overflow: 'hidden',
  },
  illustrationContainer: {
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 45 / 29,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  copyContainer: {
    width: '100%',
    alignSelf: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
  },
  title: {
    textAlign: 'left',
  },
  body: {
    textAlign: 'left',
  },
  footer: {
    paddingVertical: 16,
    alignSelf: 'stretch',
    gap: 12,
  },
  button: {
    alignSelf: 'stretch',
  },
});

export default OnboardingScreen;
