import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { AppText, Screen } from '@/src/components';
import SmallCard from '@/src/components/ui/SmallCard';
import LargeCard from '@/src/components/ui/LargeCard';
import OutlinedButton from '@/src/components/ui/OutlinedButton';
import { Notebook, Shuffle, Confetti, Cheers, ArrowClockwise } from 'phosphor-react-native';
import { theme } from '@/src/theme';
import { ResponsibleDrinkingBanner } from '@/src/components';
import { getNextShuffleSlug, incrementShuffleCount, resetShuffleState } from '@/src/utils/gameShuffle';
import { trackEvent } from '@/lib/analytics';

type Props = {
  onRestartFromSplash?: () => void;
  onShowOnboarding?: () => void;
};

const HomeScreen = ({ onRestartFromSplash, onShowOnboarding }: Props) => {
  const router = useRouter();
  const handleShuffle = useCallback(() => {
    // Reset cycle when entering a new shuffle session from home
    resetShuffleState();
    const previousGameId: string | null = null;
    const slug = getNextShuffleSlug();
    if (!slug) return;

    const shuffleCount = incrementShuffleCount();
    trackEvent('shuffle_used', {
      previous_game_id: previousGameId,
      resulting_game_id: slug,
      shuffle_count: shuffleCount,
    });

    router.push({ pathname: '/game-library/[slug]', params: { slug, origin: 'shuffle' } });
  }, [router]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.container}>
            <AppText variant="display-md" tone="surface">
              Nolza
            </AppText>
          </View>
          <View style={styles.container}>
            <AppText variant="title-md" tone="surface">
              Let's Play
            </AppText>
            <View style={styles.cardRow}>
              <SmallCard
                title="Game Library"
                description="View a curated collection of drinking games"
                icon={
                  <Notebook
                    size={theme.icons.xl}
                    color={theme.colors.icon.surface.default}
                    weight="light"
                  />
                }
                onPress={() => router.push('/game-library')}
                style={styles.card}
              />
              <SmallCard
                title="Shuffle"
                description="Select a game at random from the Game Library"
                icon={
                  <Shuffle
                    size={theme.icons.xl}
                    color={theme.colors.icon.surface.default}
                    weight="light"
                  />
                }
                onPress={handleShuffle}
                style={styles.card}
              />
            </View>
          </View>
          <View style={styles.container}>
            <AppText variant="title-md" tone="surface">
              Resources
            </AppText>
            <View style={styles.cardColumn}>
              <LargeCard
                title="Guidelines for Responsible and Mindful Social Drinking"
                description="For safe, respectful, and pleasant social drinking"
                icon={
                  <Cheers
                    size={theme.icons.xxl}
                    color={theme.colors.icon.surface.default}
                    weight="light"
                  />
                }
                onPress={() => router.push('/guidelines')}
                style={styles.cardColumnItem}
              />
              <LargeCard
                title="Getting Started"
                description="Explore how Nolza turns any gathering into a shared experience"
                icon={
                  <Confetti
                    size={theme.icons.xxl}
                    color={theme.colors.icon.surface.default}
                    weight="light"
                  />
                }
                onPress={onShowOnboarding}
                style={styles.cardColumnItem}
              />
            </View>
          </View>
          <View style={[styles.container, styles.devContainer]}>
            <AppText variant="label-md" tone="muted">
              Developer tools
            </AppText>
            <OutlinedButton
              title="Replay splash and onboarding"
              onPress={onRestartFromSplash}
              disabled={!onRestartFromSplash}
              icon={
                <ArrowClockwise
                  size={theme.icons.md}
                  color={theme.colors.text.surface.default}
                  weight="bold"
                />
              }
              style={styles.devButton}
            />
            <AppText variant="body-sm" tone="muted" style={styles.devCaption}>
              Clears onboarding storage so the app reopens on the splash and onboarding screens.
            </AppText>
          </View>
        </View>
        <View style={styles.bannerSection}>
          <ResponsibleDrinkingBanner onPress={() => router.push('/guidelines')} />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
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
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    //alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
  },
  cardColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
  },
  card: {
    flex: 1,
    minWidth: 0,
    width: 'auto',
  },
  cardColumnItem: {
    alignSelf: 'stretch',
    width: '100%',
  },
  bannerSection: {
    alignItems: 'stretch',
  },
  devContainer: {
    gap: 12,
    borderWidth: theme.stroke.md,
    borderColor: theme.colors.stroke.surface.secondary,
    borderRadius: theme.radius.md,
  },
  devButton: {
    alignSelf: 'stretch',
  },
  devCaption: {
    marginTop: -4,
  },
});

export default HomeScreen;
