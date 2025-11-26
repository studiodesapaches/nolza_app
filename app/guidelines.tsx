import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

import { AccordionItem, AppText, Screen, TopAppBar } from '@/src/components';
import { theme } from '@/src/theme';

const GuidelinesScreen = () => {
  const router = useRouter();
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const items = useMemo(
    () => [
      {
        id: 'drink-legally',
        title: 'I. Drink Legally',
        content: (
          <View style={styles.accordionContent}>
            <AppText variant="body-md" tone="surfaceSecondary">
              Always respect the legal drinking age in your country. Underage drinking is both
              unsafe and illegal.
            </AppText>
            <AppText variant="body-md" tone="surfaceSecondary">
              If you notice someone underage drinking, encourage them to stop and seek help from a
              responsible adult if necessary. Never provide alcohol to anyone underage.
            </AppText>
            <AppText variant="body-md" tone="surfaceSecondary">
              Drinking legally helps keep everyone safe and avoids serious legal consequences.
            </AppText>
          </View>
        ),
      },
      {
        id: 'avoid-driving',
        title: 'II. Avoid Driving Under the Influence',
        content: (
          <View style={styles.accordionContent}>
            <AppText variant="body-md" tone="surfaceSecondary">
              Never drink and drive. If you plan to drink, arrange a safe way home—such as a
              designated driver, taxi, or rideshare service.
            </AppText>
            <AppText variant="body-md" tone="surfaceSecondary">
              If you see someone attempting to drive while impaired, intervene safely—offer
              alternative transportation or contact someone who can help. Protecting yourself and
              others should always be your top priority.
            </AppText>
          </View>
        ),
      },
      {
        id: 'stay-hydrated',
        title: 'III. Stay Hydrated',
        content: (
          <View style={styles.accordionContent}>
            <AppText variant="body-md" tone="surfaceSecondary">
              Drink water throughout the event to maintain balance and well-being. Alternating
              alcoholic drinks with non-alcoholic beverages is strongly encouraged.
            </AppText>
          </View>
        ),
      },
      {
        id: 'respect-limits',
        title: 'IV. Know and Respect Personal Limits',
        content: (
          <View style={styles.accordionContent}>
            <AppText variant="body-md" tone="surfaceSecondary">
              Listen to your body and understand your alcohol tolerance. Pace yourself, take breaks
              when needed, and stop drinking if you feel unwell or unsafe.
            </AppText>
            <AppText variant="body-md" tone="surfaceSecondary">
              Drinking games are meant to be fun for everyone. No one should feel pressured to binge
              drink—or even to drink alcohol at all. Substituting alcoholic beverages with
              non-alcoholic alternatives during games is a great way to prevent overconsumption.
            </AppText>
          </View>
        ),
      },
      {
        id: 'prioritize-safety',
        title: 'V. Prioritize Safety, Consent, and Inclusion',
        content: (
          <View style={styles.accordionContent}>
            <AppText variant="body-md" tone="surfaceSecondary">
              All participants should feel safe, respected, and in control. Drinking games should
              focus on shared enjoyment, not peer pressure or risky behavior.
            </AppText>
            <AppText variant="body-md" tone="surfaceSecondary">
              Never pressure anyone to drink or participate. Respect everyone&apos;s boundaries and
              ensure all activities are safe and fully consensual.
            </AppText>
          </View>
        ),
      },
      {
        id: 'foster-inclusive',
        title: 'VI. Foster a Respectful and Inclusive Social Environment',
        content: (
          <View style={styles.accordionContent}>
            <AppText variant="body-md" tone="surfaceSecondary">
              A positive social environment makes drinking games enjoyable for everyone. Celebrate
              connections, not consumption.
            </AppText>
            <AppText variant="body-md" tone="surfaceSecondary">
              Encourage participation without judgment, and respect choices to abstain from alcohol
              or replace it with non-alcoholic alternatives. Honoring everyone&apos;s decisions
              ensures all participants feel included and comfortable.
            </AppText>
          </View>
        ),
      },
    ],
    []
  );
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() =>
    items.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Screen style={styles.screen}>
      <TopAppBar
        leftIcon={<CaretLeft />}
        onPressLeft={() => router.back()}
        leftA11yLabel="Go back"
        style={styles.topBar}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces>
        <View style={styles.container}>
          <AppText variant="display-sm" tone="surface">
            Guidelines for Responsible and Mindful Social Drinking
          </AppText>
        </View>
        <View style={styles.container}>
          <AppText variant="body-md" tone="surfaceSecondary">
            Social drinking should always be safe, respectful, and enjoyable for everyone. To help
            ensure a positive experience, please follow these guidelines:
          </AppText>
          <View style={styles.accordionStack}>
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                title={item.title}
                expanded={!!expandedMap[item.id]}
                onPress={() => toggleItem(item.id)}
                content={item.content}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 56,
  },
  container: {
    display: 'flex',
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    alignSelf: 'stretch',
  },
  accordionStack: {
    flexDirection: 'column',
    gap: 12,
    alignSelf: 'stretch',
  },
  accordionContent: {
    flexDirection: 'column',
    gap: 12,
  },
});

export default GuidelinesScreen;
