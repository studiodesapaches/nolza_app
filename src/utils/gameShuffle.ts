import { games } from '@/src/data/games';

const usedSlugs = new Set<string>();
let shuffleCount = 0;
let pendingTipIndex: number | null = null;

const allSlugs = () => games.map((g) => g.slug);

export const resetShuffleState = () => {
  usedSlugs.clear();
  shuffleCount = 0;
  pendingTipIndex = null;
};

export const getShuffleCount = () => shuffleCount;

export const getNextShuffleSlug = (excludeSlug?: string): string | null => {
  const buildPool = () => allSlugs().filter((slug) => slug !== excludeSlug);

  let pool = buildPool().filter((slug) => !usedSlugs.has(slug));
  if (!pool.length) {
    usedSlugs.clear();
    pool = buildPool();
  }
  if (!pool.length) return null;

  const nextSlug = pool[Math.floor(Math.random() * pool.length)];
  usedSlugs.add(nextSlug);
  return nextSlug;
};

export const markShuffleSlugUsed = (slug?: string) => {
  if (!slug) return;
  usedSlugs.add(slug);
};

export const incrementShuffleCount = () => {
  shuffleCount += 1;
  return shuffleCount;
};

export const setPendingTipIndex = (index: number | null) => {
  pendingTipIndex = index;
};

export const consumePendingTipIndex = () => {
  const tip = pendingTipIndex;
  pendingTipIndex = null;
  return tip;
};
