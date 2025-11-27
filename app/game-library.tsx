import React, { useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

import { AppText, GameLibraryCard, ResponsibleDrinkingBanner, Screen, TopAppBar } from '@/src/components';
import { games } from '@/src/data/games';
import { theme } from '@/src/theme';
import { trackEvent } from '@/lib/analytics';

const GameLibraryScreen = () => {
  const router = useRouter();
  const lastBucketRef = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const maxScrollable = Math.max(contentSize.height - layoutMeasurement.height, 1);
    const depth = Math.min(100, Math.round((scrollY / maxScrollable) * 100));
    const bucket = Math.min(100, Math.floor(depth / 25) * 25);

    if (bucket >= lastBucketRef.current + 25 || (bucket === 100 && lastBucketRef.current < 100)) {
      lastBucketRef.current = bucket;
      trackEvent('game_list_scrolled', { scroll_depth_percentage: bucket });
    }
  };

  return (
    <Screen style={styles.screen}>
      <TopAppBar
        leftIcon={<CaretLeft />}
        onPressLeft={() => router.back()}
        leftA11yLabel="Go back"
        style={styles.topBar}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        <View style={styles.container}>
          <AppText variant="display-md" tone="surface">
            Game Library
          </AppText>
        </View>
        <View style={styles.container}>
          <View style={styles.cardStack}>
            {games.map((game) => (
              <GameLibraryCard
                key={game.slug}
                title={game.title}
                description={game.tagline}
                playersCount={game.overview.players}
                onPress={() =>
                  router.push({
                    pathname: '/game-library/[slug]',
                    params: { slug: game.slug, origin: 'game-library' },
                  })
                }
              />
            ))}
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
  cardStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignSelf: 'stretch',
  },
  bannerSection: {
    alignItems: 'stretch',
  },
});

export default GameLibraryScreen;
