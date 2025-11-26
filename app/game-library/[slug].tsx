import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { CaretLeft, Shuffle } from 'phosphor-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  AccordionItem,
  AppText,
  FloatingActionButton,
  InstructionCard,
  ModalCard,
  OverviewCard,
  ResponsibleDrinkingBanner,
  Screen,
  TopAppBar,
} from '@/src/components';
import { Game, getGameBySlug } from '@/src/data/games';
import {
  consumePendingTipIndex,
  getNextShuffleSlug,
  incrementShuffleCount,
  markShuffleSlugUsed,
  resetShuffleState,
  setPendingTipIndex,
} from '@/src/utils/gameShuffle';
import { theme } from '@/src/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INSTRUCTION_GAP = 12;
const SAFETY_TIPS = [
  {
    title: 'Mix it up with non-alcoholic options',
    body:
      'Substitute alcoholic drinks with water, soft drinks, or mocktails during games to stay refreshed and help prevent binge drinking.',
  },
  {
    title: 'Take care of yourself',
    body:
      'Stay hydrated, pace yourself, and take breaks when you need them. If you ever start to feel unwell or uncomfortable, it is always okay to stop drinking.',
  },
  {
    title: 'Make sure everyone feels comfortable',
    body:
      'Never pressure anyone to drink or join a game. Everyone should feel free to participate at their own pace.',
  },
  {
    title: 'Create an inclusive atmosphere',
    body:
      'Encourage participation without judgment, and celebrate everyone\'s choices - whether they are drinking alcohol, sipping a mocktail, or skipping drinks altogether.',
  },
];

const GameDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ slug?: string | string[]; origin?: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const originParam = Array.isArray(params.origin) ? params.origin[0] : params.origin;
  const game = getGameBySlug(slug);
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(300, width - 32);
  const insets = useSafeAreaInsets();
  const [activeTipIndex, setActiveTipIndex] = useState<number | null>(null);
  const skipResetRef = useRef(false);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    markShuffleSlugUsed(slug);
    return () => {
      if (!skipResetRef.current) {
        resetShuffleState();
      }
    };
  }, [slug]);

  useEffect(() => {
    const pendingTip = consumePendingTipIndex();
    if (pendingTip !== null && pendingTip !== undefined) {
      setActiveTipIndex(pendingTip);
    }
  }, []);

  const handleBack = () => {
    // With shuffle navigation using replace, history should point back to the origin screen.
    resetShuffleState();
    router.back();
  };

  const handleShuffle = () => {
    skipResetRef.current = true;
    const nextCount = incrementShuffleCount();
    if (nextCount % 4 === 0) {
      const tipIndex = ((nextCount / 4 - 1) % SAFETY_TIPS.length + SAFETY_TIPS.length) % SAFETY_TIPS.length;
      setPendingTipIndex(tipIndex);
    } else {
      setPendingTipIndex(null);
    }

    const nextSlug = getNextShuffleSlug(slug);
    if (!nextSlug) return;
    router.replace({
      pathname: '/game-library/[slug]',
      params: { slug: nextSlug, origin: originParam },
    });
  };

  if (!game) {
    return (
      <Screen style={styles.screen}>
        <TopAppBar
          leftIcon={<CaretLeft />}
          onPressLeft={handleBack}
          leftA11yLabel="Go back"
          style={styles.topBar}
        />
        <View style={[styles.container, styles.missingContainer, { paddingTop: 56 }]}>
          <AppText variant="display-sm" tone="surface">
            Game not found
          </AppText>
          <AppText variant="body-md" tone="surfaceSecondary">
            We couldn&apos;t find that game. Please go back and try again.
          </AppText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <TopAppBar
        leftIcon={<CaretLeft />}
        onPressLeft={handleBack}
        leftA11yLabel="Go back"
        style={styles.topBar}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <View style={styles.header}>
          <AppText variant="display-md" tone="surface">
            {game.title}
          </AppText>
          <AppText variant="body-lg" tone="surfaceSecondary">
            {game.tagline}
          </AppText>
        </View>

        <View style={styles.container}>
          <AppText variant="title-md" tone="surface">
            Overview
          </AppText>
          <OverviewCard
            players={game.overview.players}
            drinks={game.overview.drinks}
            materials={game.overview.materials}
          />
        </View>

        <InstructionsSection game={game} cardWidth={cardWidth} />

        {game.extendedRules && game.extendedRules.length ? (
          <ExtendedRulesSection game={game} />
        ) : null}

        <View style={styles.bannerSection}>
          <ResponsibleDrinkingBanner onPress={() => router.push('/guidelines')} />
        </View>
      </ScrollView>
      <FloatingActionButton
        onPress={handleShuffle}
        icon={
          <Shuffle
            size={theme.icons.lg}
            weight="bold"
            color={theme.colors.icon.surface.default}
          />
        }
        style={[styles.fab]}
      />
      {activeTipIndex !== null ? (
        <SafetyTipModal
          tip={SAFETY_TIPS[activeTipIndex]}
          onClose={() => setActiveTipIndex(null)}
          insetBottom={insets.bottom}
        />
      ) : null}
    </Screen>
  );
};

const InstructionsSection: React.FC<{ game: Game; cardWidth: number }> = ({ game, cardWidth }) => {
  if (!game.instructions.length) {
    return (
      <View style={styles.container}>
        <AppText variant="title-md" tone="surface">
          Instructions
        </AppText>
        <AppText variant="body-md" tone="surfaceSecondary">
          Instructions coming soon.
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppText variant="title-md" tone="surface">
        Instructions
      </AppText>
      <FlatList
        data={game.instructions}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.instructionList}
        style={styles.instructionListContainer}
        ItemSeparatorComponent={() => <View style={{ width: INSTRUCTION_GAP }} />}
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={cardWidth + INSTRUCTION_GAP}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <InstructionCard
            title={item.title}
            description={item.description}
            stepNumber={index + 1}
            totalSteps={game.instructions.length}
            image={item.image}
            style={[styles.instructionCard, { width: cardWidth }]}
          />
        )}
      />
    </View>
  );
};

const ExtendedRulesSection: React.FC<{ game: Game }> = ({ game }) => {
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() =>
    game.extendedRules?.reduce((acc, rule) => {
      acc[rule.id] = false;
      return acc;
    }, {} as Record<string, boolean>) ?? {}
  );

  const toggleRule = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const items = useMemo(() => game.extendedRules ?? [], [game.extendedRules]);

  if (!items.length) return null;

  return (
    <View style={styles.container}>
      <AppText variant="title-md" tone="surface">
        Extended Rules
      </AppText>
      <View style={styles.accordionStack}>
        {items.map((rule) => (
          <AccordionItem
            key={rule.id}
            title={rule.title}
            expanded={!!expandedMap[rule.id]}
            onPress={() => toggleRule(rule.id)}
            content={
              <View style={styles.extendedCopy}>
                {rule.description.map((paragraph, index) => (
                  <AppText key={index} variant="body-md" tone="surfaceSecondary">
                    {paragraph}
                  </AppText>
                ))}
              </View>
            }
          />
        ))}
      </View>
    </View>
  );
};

type SafetyTip = {
  title: string;
  body: string;
};

const SAFETY_ICON = require('../../assets/Reminders_01.png');

const SafetyTipModal: React.FC<{
  tip: SafetyTip;
  onClose: () => void;
}> = ({ tip, onClose }) => {
  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <ModalCard
            title={tip.title}
            description={tip.body}
            ctaLabel="Continue"
            onPressCta={onClose}
            imageSource={SAFETY_ICON}
            style={styles.tipCard}
          />
        </Pressable>
      </Pressable>
    </Modal>
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
  missingContainer: {
    gap: 12,
  },
  header: {
    display: 'flex',
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
    alignSelf: 'stretch',
  },
  instructionListContainer: {
    marginHorizontal: -12,
  },
  instructionList: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  instructionCard: {
    flexShrink: 0,
  },
  accordionStack: {
    flexDirection: 'column',
    gap: 12,
    alignSelf: 'stretch',
  },
  extendedCopy: {
    flexDirection: 'column',
    gap: 12,
  },
  bannerSection: {
    alignItems: 'stretch',
  },
  fab: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.utility.scrim,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '90%',
    maxWidth: 360,
  },
  tipCard: {
    alignSelf: 'center',
  },
});

export default GameDetailScreen;
