import { ImageSourcePropType } from 'react-native';

const aptImages = {
  step1: require('@/assets/games/apt-apartment/instruction-01-gameplay.png') as ImageSourcePropType,
  step2: require('@/assets/games/apt-apartment/instruction-02-gameplay.png') as ImageSourcePropType,
  step3: require('@/assets/games/apt-apartment/instruction-03-gameplay.png') as ImageSourcePropType,
};

const bottleCapImages = {
  setup: require('@/assets/games/bottle-cap/instruction-01-setup.png') as ImageSourcePropType,
  gameplay: require('@/assets/games/bottle-cap/instruction-02-gameplay.png') as ImageSourcePropType,
};

const fingersImages = {
  step1: require('@/assets/games/fingers/instruction-01-setup.png') as ImageSourcePropType,
  step2: require('@/assets/games/fingers/instruction-02-gameplay.png') as ImageSourcePropType,
  step3: require('@/assets/games/fingers/instruction-03-gameplay.png') as ImageSourcePropType,
  step4: require('@/assets/games/fingers/instruction-04-gameplay.png') as ImageSourcePropType,
  step5: require('@/assets/games/fingers/instruction-05-gameplay.png') as ImageSourcePropType,
};

const highLowImages = {
  step1: require('@/assets/games/high-low/instruction-01-setup.png') as ImageSourcePropType,
  step2: require('@/assets/games/high-low/instruction-02-gameplay.png') as ImageSourcePropType,
  step3: require('@/assets/games/high-low/instruction-03-gameplay.png') as ImageSourcePropType,
};

const horseraceImages = {
  step1: require('@/assets/games/horserace/instruction-01-setup.png') as ImageSourcePropType,
  step2: require('@/assets/games/horserace/instruction-02-setup.png') as ImageSourcePropType,
  step3: require('@/assets/games/horserace/instruction-03-gameplay.png') as ImageSourcePropType,
  step4: require('@/assets/games/horserace/instruction-04-gameplay.png') as ImageSourcePropType,
  step5: require('@/assets/games/horserace/instruction-05-gameplay.png') as ImageSourcePropType,
};

const kingsCupImages = {
  step1: require('@/assets/games/kings-cup/instruction-01-setup.png') as ImageSourcePropType,
  step2: require('@/assets/games/kings-cup/instruction-02-setup.png') as ImageSourcePropType,
  step3: require('@/assets/games/kings-cup/instruction-03-gameplay.png') as ImageSourcePropType,
  step4: require('@/assets/games/kings-cup/instruction-04-gameplay.png') as ImageSourcePropType,
};

const noonchiImages = {
  step1: require('@/assets/games/noonchi/instruction-01-gameplay.png') as ImageSourcePropType,
  step2: require('@/assets/games/noonchi/instruction-02-gameplay.png') as ImageSourcePropType,
  step3: require('@/assets/games/noonchi/instruction-03-gameplay.png') as ImageSourcePropType,
};

const titanicImages = {
  step1: require('@/assets/games/titanic/instruction-01-setup.png') as ImageSourcePropType,
  step2: require('@/assets/games/titanic/instruction-02-setup.png') as ImageSourcePropType,
  step3: require('@/assets/games/titanic/instruction-03-gameplay.png') as ImageSourcePropType,
  step4: require('@/assets/games/titanic/instruction-04-gameplay.png') as ImageSourcePropType,
};

export type InstructionStep = {
  id: string;
  title: string;
  description: string[];
  image?: ImageSourcePropType;
};

export type ExtendedRule = {
  id: string;
  title: string;
  description: string[];
};

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  overview: {
    players: string;
    drinks: string;
    materials: string;
  };
  instructions: InstructionStep[];
  extendedRules?: ExtendedRule[];
};

// Placeholder text is included so the screens render immediately.
// Replace the descriptions and add images with your finalized copy/assets.
export const games: Game[] = [
  {
    slug: 'apt-apartment',
    title: 'APT (Apartment)',
    tagline: 'Chant, stack, and count. When the number hits, the last hand up drinks.',
    overview: {
      players: '3+',
      drinks: 'Any',
      materials: 'None',
    },
    instructions: [
      {
        id: 'apt-1',
        title: 'Gameplay',
        description: [
          'Players chant “apateu, apateu” twice while waving their hands to the rhythm, alternating one above the other.',
          'After the chant, all players place their hands together in a central stack.',
        ],
        image: aptImages.step1,
      },
      {
        id: 'apt-2',
        title: 'Gameplay',
        description: [
          'The game leader calls out a random number.',
          'Players take turns moving the hand at the bottom of the stack to the top, counting out loud in ascending order from one with each move.',
        ],
        image: aptImages.step2,
      },
      {
        id: 'apt-3',
        title: 'Gameplay',
        description: [
          'The player who moves their hand to the top when the count reaches the leader’s number loses the game and drinks.',
        ],
        image: aptImages.step3,
      },
    ],
  },
  {
    slug: 'bottle-cap',
    title: 'Bottle Cap',
    tagline: 'Take aim and flick away. When the strip snaps off, your neighbors drink.',
    overview: {
      players: '2+',
      drinks: 'Soju',
      materials: 'Soju Bottle',
    },
    instructions: [
      {
        id: 'bottle-cap-1',
        title: 'Setup',
        description: [
          'Twist the metal strip on the edge of a soju bottle cap four to six full turns.',
          'Some bottle caps have two metal strips, which may make this game more difficult to play.',
        ],
        image: bottleCapImages.setup,
      },
      {
        id: 'bottle-cap-2',
        title: 'Gameplay',
        description: [
          'Starting with the game leader and going clockwise, players take turns flicking the twisted strip until it snaps off.',
          'When a player flicks the strip free, the players sitting on either side of them drink.',
        ],
        image: bottleCapImages.gameplay,
      },
    ],
  },
  {
    slug: 'fingers',
    title: 'Fingers',
    tagline: 'Count, guess, and lift your finger. The last finger standing drinks.',
    overview: {
      players: '2+',
      drinks: 'Liquor or Soju',
      materials: 'Shot Glass or Cup',
    },
    instructions: [
      {
        id: 'fingers-1',
        title: 'Setup',
        description: [
          'Fill a shot glass or cup with liquor or soju. All players place one index finger on the rim of the glass.',
          'If there are only two players, each places both index fingers on the rim.',
        ],
        image: fingersImages.step1,
      },
      {
        id: 'fingers-2',
        title: 'Gameplay',
        description: [
          'Starting with the game leader and going clockwise, players take turns counting down from three then calling out a number between zero and the total number of fingers on the rim.',
        ],
        image: fingersImages.step2,
      },
      {
        id: 'fingers-3',
        title: 'Gameplay',
        description: [
          'Immediately after the count, each player chooses to keep their finger on the rim or remove it.',
        ],
        image: fingersImages.step3,
      },
      {
        id: 'fingers-4',
        title: 'Gameplay',
        description: [
          'If the called number matches the number of fingers remaining, the caller is safe and removed from the game.',
          'If the called number does not match the number of fingers remaining, the caller stays in the game.',
        ],
        image: fingersImages.step4,
      },
      {
        id: 'fingers-5',
        title: 'Gameplay',
        description: [
          'The game continues until only one player remains. The last player drinks the contents of the shot glass or cup.',
        ],
        image: fingersImages.step5,
      },
    ],
  },
  {
    slug: 'high-low',
    title: 'High Low (Up Down)',
    tagline: 'Guess the secret number under a soju bottle cap. Get it right, and your neighbors drink.',
    overview: {
      players: '2+',
      drinks: 'Soju',
      materials: 'Soju Bottle',
    },
    instructions: [
      {
        id: 'high-low-1',
        title: 'Setup',
        description: [
          'The game leader checks the number faintly inscribed on the inside of the soju bottle cap, usually ranging from one to fifty. The leader does not play and only facilitates the game.',
          'Instructions for the two-player variation can be found in the “Extended Rules” below.',
        ],
        image: highLowImages.step1,
      },
      {
        id: 'high-low-2',
        title: 'Gameplay',
        description: [
          'Starting with the player clockwise to the game leader and continuing, players take turns guessing the number.',
          'After each guess, the leader responds with “higher” or “lower.”',
        ],
        image: highLowImages.step2,
      },
      {
        id: 'high-low-3',
        title: 'Gameplay',
        description: [
          'When a player guesses the number correctly, the players sitting on either side of them drink.',
        ],
        image: highLowImages.step3,
      },
    ],
    extendedRules: [
      {
        id: 'high-low-two-player',
        title: 'Two-Player Variation',
        description: [
          'Both players guess a number from one to fifty. Reveal the number faintly inscribed on the inside of the soju bottle cap. The player whose guess is furthest from the number drinks.',
        ],
      },
    ],
  },
  {
    slug: 'horserace',
    title: 'Horserace',
    tagline: 'Back a horse and test your luck. When the race is over, losers drink.',
    overview: {
      players: '2+',
      drinks: 'Any',
      materials: 'Playing Cards',
    },
    instructions: [
      {
        id: 'horserace-1',
        title: 'Setup',
        description: [
          'The game leader (dealer) places the four Aces (horses) from the playing cards (no Jokers) in a horizontal line.',
          'Shuffle and deal a column (racetrack) of four to six face-down cards (steps) perpendicular to the horses, forming an “L” shape with the deck of unused cards (draw pile) in the corner.',
        ],
        image: horseraceImages.step1,
      },
      {
        id: 'horserace-2',
        title: 'Setup',
        description: [
          'Each player picks a horse they think will win before the game begins. Choices cannot be changed once play starts.',
        ],
        image: horseraceImages.step2,
      },
      {
        id: 'horserace-3',
        title: 'Gameplay',
        description: [
          'The dealer draws cards one at a time from the draw pile and reveals each card’s suit. The horse matching that suit moves forward one step.',
        ],
        image: horseraceImages.step3,
      },
      {
        id: 'horserace-4',
        title: 'Gameplay',
        description: [
          'When all four horses reach or pass a step on the racetrack, the dealer flips that step card over. The suit shown on the flipped card moves its corresponding horse back one step.',
        ],
        image: horseraceImages.step4,
      },
      {
        id: 'horserace-5',
        title: 'Gameplay',
        description: [
          'The dealer continues drawing and flipping cards until one horse passes the final step card. Players who picked any of the losing horses drink.',
        ],
        image: horseraceImages.step5,
      },
    ],
  },
  {
    slug: 'kings-cup',
    title: "King's Cup",
    tagline: 'Draw cards and follow their rules. When the last King appears, someone must face the King’s Cup.',
    overview: {
      players: '4-10',
      drinks: 'Beer or hard seltzer',
      materials: 'Glass or cup, playing cards',
    },
    instructions: [
      {
        id: 'kings-1',
        title: 'Setup',
        description: [
          'Give each player their own drink.',
          'Choose something light, like beer or hard seltzer, since this game includes frequent sipping.',
        ],
        image: kingsCupImages.step1,
      },
      {
        id: 'kings-2',
        title: 'Setup',
        description: [
          'Place a glass or cup (the King’s Cup) on the playing surface.',
          'Spread playing cards (no Jokers) face down in a circle around the King’s Cup.',
        ],
        image: kingsCupImages.step2,
      },
      {
        id: 'kings-3',
        title: 'Gameplay',
        description: [
          'Starting with the game leader and going clockwise, players take turns drawing a card and following the rule associated with the card.',
          'Card rules can be found in the “Extended Rules” below.',
        ],
        image: kingsCupImages.step3,
      },
      {
        id: 'kings-4',
        title: 'Gameplay',
        description: [
          'Whenever a player draws a King, they pour some of their drink into the King’s Cup.',
          'When the fourth King is drawn, that player drinks the mixture in the King’s Cup, and the game ends.',
        ],
        image: kingsCupImages.step4,
      },
    ],
    extendedRules: [
      {
        id: 'kings-rules',
        title: 'Card Rules',
        description: [
          'Ace (Waterfall): Start and stop sipping when you please. Going clockwise, each player sips until the player before them stops but may continue sipping as long as they choose.',
          '2 (You): Choose any player to take a sip.',
          '3 (Me): Take a sip.',
          '4 (Floor): Everyone touches the floor. Last player to do so sips.',
          '5 (Guys): All men sip.',
          '6 (Chicks): All women sip.',
          '7 (Heaven): Everyone raises a hand. Last player to do so sips.',
          '8 (Mate): Pick a partner. They must sip whenever you sip.',
          '9 (Rhyme): Say a word. Going clockwise, each player says a word that rhymes. First to fail sips.',
          '10 (Categories): Pick a category. Going clockwise, each player takes turns naming an item in that category. First to fail sips.',
          'Jack (Never Have I Ever): Say something you’ve never done. Any player who has done it sips.',
          'Queen (Questions): Ask a player a question. That player asks another player a question. The first player to fail to answer sips.',
          'King (King’s Cup): Pour some of your drink into the King’s Cup. You may also create a new rule for all players to follow. When the fourth King is drawn, that player drinks the mixture in the King’s Cup, and the game ends.',
        ],
      },
    ],
  },
  {
    slug: 'noonchi',
    title: 'Noonchi',
    tagline: 'Read the room and call out numbers in order without overlap. If voices collide or someone’s left last, they drink.',
    overview: {
      players: '5+',
      drinks: 'Any',
      materials: 'None',
    },
    instructions: [
      {
        id: 'noonchi-1',
        title: 'Gameplay',
        description: [
          'Starting with the game leader, players count aloud from one up to the total number of players.',
          'Only one player may call each number. There is no set turn order. Any player can call out a number whenever they feel the timing is right.',
        ],
        image: noonchiImages.step1,
      },
      {
        id: 'noonchi-2',
        title: 'Gameplay',
        description: [
          'If two or more players shout the same number at the same time, they drink and the game ends.',
          'Once a player successfully calls out a number, they’re safe and don’t call again.',
        ],
        image: noonchiImages.step2,
      },
      {
        id: 'noonchi-3',
        title: 'Gameplay',
        description: [
          'If only one player remains without having called out a number, they drink and the game ends.',
        ],
        image: noonchiImages.step3,
      },
    ],
  },
  {
    slug: 'titanic',
    title: 'Titanic',
    tagline: 'Take turns pouring soju into the floating shot glass. Whoever sinks the Titanic drinks the mixture.',
    overview: {
      players: '2+',
      drinks: 'Beer, Soju',
      materials: 'Glass or Cup, Shot Glass or Cup, Soju Bottle',
    },
    instructions: [
      {
        id: 'titanic-1',
        title: 'Setup',
        description: [
          'Fill a glass or cup halfway to three-fourths full with beer.',
          'Gently place a shot glass or cup (the Titanic) in the center so that it floats on top. It should not touch the bottom.',
        ],
        image: titanicImages.step1,
      },
      {
        id: 'titanic-2',
        title: 'Setup',
        description: [
          'Have a bottle of soju ready for pouring.',
          'Soju is recommended because its small bottle size makes it easy to control, but any liquor can be used.',
        ],
        image: titanicImages.step2,
      },
      {
        id: 'titanic-3',
        title: 'Gameplay',
        description: [
          'Starting with the game leader going clockwise, players take turns carefully pouring soju into the floating Titanic.',
          'Each player must add at least one drop per turn, but can pour more if they choose.',
        ],
        image: titanicImages.step3,
      },
      {
        id: 'titanic-4',
        title: 'Gameplay',
        description: [
          'As the Titanic fills, it will eventually submerge and sink to the bottom of the glass.',
          'The player who causes the Titanic to sink drinks the mixture in the glass or cup.',
        ],
        image: titanicImages.step4,
      },
    ],
  },
];

export const gamesBySlug: Record<string, Game> = games.reduce((acc, game) => {
  acc[game.slug] = game;
  return acc;
}, {} as Record<string, Game>);

export const getGameBySlug = (slug?: string) => {
  if (!slug) return undefined;
  return gamesBySlug[slug];
};
