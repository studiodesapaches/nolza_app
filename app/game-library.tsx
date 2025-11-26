import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

import { AppText, GameLibraryCard, ResponsibleDrinkingBanner, Screen, TopAppBar } from '@/src/components';
import { games } from '@/src/data/games';
import { theme } from '@/src/theme';

const GameLibraryScreen = () => {
  const router = useRouter();

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
