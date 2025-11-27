
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';

import OnboardingScreen from '@/src/features/onboarding/OnboardingScreen';
import {
  getHasSeenOnboarding,
  resetHasSeenOnboarding,
  setHasSeenOnboarding,
} from '@/src/utils/onboardingStorage';
import { theme } from '@/src/theme';
import { trackEvent } from '@/lib/analytics';

import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoadingOnboardingState, setIsLoadingOnboardingState] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState(false);
  const [showOnboardingAgain, setShowOnboardingAgain] = useState(false);
  const splashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const reopenTranslateY = useRef(new Animated.Value(0)).current;
  const { height: windowHeight } = useWindowDimensions();
  const hasLoggedInitialOnboardingStart = useRef(false);

  const scheduleSplashTransition = useCallback(() => {
    if (splashTimeoutRef.current) {
      clearTimeout(splashTimeoutRef.current);
    }

    splashTimeoutRef.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => setShowSplash(false));
    }, 800);
  }, [contentOpacity, splashOpacity]);

  useEffect(() => {
    const loadOnboardingState = async () => {
      const hasSeen = await getHasSeenOnboarding();
      setHasSeenOnboardingState(hasSeen);
      setIsLoadingOnboardingState(false);
    };

    loadOnboardingState();

    scheduleSplashTransition();

    return () => {
      if (splashTimeoutRef.current) {
        clearTimeout(splashTimeoutRef.current);
      }
    };
  }, [scheduleSplashTransition]);

  const handleCompleteOnboarding = useCallback(async () => {
    await setHasSeenOnboarding();
    setHasSeenOnboardingState(true);
    if (showOnboardingAgain) {
      Animated.timing(reopenTranslateY, {
        toValue: windowHeight,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        setShowOnboardingAgain(false);
      });
    }
  }, [reopenTranslateY, showOnboardingAgain, windowHeight]);

  const handleRestartFromSplash = useCallback(async () => {
    await resetHasSeenOnboarding();

    splashOpacity.stopAnimation();
    contentOpacity.stopAnimation();
    splashOpacity.setValue(1);
    contentOpacity.setValue(0);

    setHasSeenOnboardingState(false);
    setIsLoadingOnboardingState(false);
    setShowOnboardingAgain(false);
    setShowSplash(true);

    scheduleSplashTransition();
  }, [contentOpacity, scheduleSplashTransition, splashOpacity]);

  const handleOpenOnboardingFromHome = useCallback(() => {
    trackEvent('onboarding_revisited', { entry_point: 'home_button' });
    trackEvent('onboarding_started', { entry_point: 'revisit' });
    reopenTranslateY.setValue(windowHeight);
    setShowOnboardingAgain(true);
  }, [reopenTranslateY, windowHeight]);

  const handleCloseOnboarding = useCallback(() => {
    if (!showOnboardingAgain) return;
    Animated.timing(reopenTranslateY, {
      toValue: windowHeight,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setShowOnboardingAgain(false);
    });
  }, [reopenTranslateY, showOnboardingAgain, windowHeight]);

  useEffect(() => {
    if (showOnboardingAgain) {
      reopenTranslateY.setValue(windowHeight);
      Animated.timing(reopenTranslateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [reopenTranslateY, showOnboardingAgain, windowHeight]);

  const shouldShowInitialOnboarding = !isLoadingOnboardingState && !hasSeenOnboarding;
  const shouldShowHome = !isLoadingOnboardingState && hasSeenOnboarding;

  useEffect(() => {
    if (shouldShowInitialOnboarding && !hasLoggedInitialOnboardingStart.current) {
      hasLoggedInitialOnboardingStart.current = true;
      trackEvent('onboarding_started', { entry_point: 'first_launch' });
    }
  }, [shouldShowInitialOnboarding]);

  return (
    <View style={styles.root}>
      <Animated.View
        pointerEvents={showSplash ? 'none' : 'auto'}
        style={[StyleSheet.absoluteFillObject, { opacity: contentOpacity }]}
      >
        {!isLoadingOnboardingState && (
          shouldShowInitialOnboarding ? (
            <OnboardingScreen
              onComplete={handleCompleteOnboarding}
            />
          ) : (
            <HomeScreen
              onRestartFromSplash={handleRestartFromSplash}
              onShowOnboarding={handleOpenOnboardingFromHome}
            />
          )
        )}
        {showOnboardingAgain ? (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { transform: [{ translateY: reopenTranslateY }] },
            ]}
          >
            <OnboardingScreen onComplete={handleCompleteOnboarding} onClose={handleCloseOnboarding} />
          </Animated.View>
        ) : null}
      </Animated.View>
      {showSplash ? (
        <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: splashOpacity }]}>
          <SplashScreen />
        </Animated.View>
      ) : null}
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
});
