/** @type {import('./types').Activity[]} */
export const activities = [
  {
    id: 'savannah-match',
    title: 'Savannah Match',
    summary: 'Match each animal to its habitat before time runs out.',
    description:
      'A friendly matching game set in the Kenyan savannah. Drag animals to the correct homes and earn explorer stars.',
    kind: 'game',
    theme: 'savannah',
    emoji: '🦁',
    color: 'sun',
    minutes: 5,
    xp: 30,
    instructions: [
      'Tap an animal to pick it up.',
      'Tap its home to place it.',
      'Match all animals to finish.',
    ],
  },
  {
    id: 'coral-puzzle',
    title: 'Coral Reef Puzzle',
    summary: 'Slide the tiles to reveal a hidden reef picture.',
    description:
      'A gentle sliding puzzle with a coastal theme. Complete the picture to unlock the Reef Explorer badge.',
    kind: 'challenge',
    theme: 'coast',
    emoji: '🐠',
    color: 'sky',
    minutes: 6,
    xp: 40,
    instructions: [
      'Tap a tile next to the empty space to slide it.',
      'Arrange the picture.',
      'Complete it to earn a badge.',
    ],
  },
  {
    id: 'forest-studio',
    title: 'Forest Studio',
    summary: 'Build your own forest scene with stamps and colors.',
    description:
      'A free creative studio with trees, animals, rivers, and sky stamps. Save or share your scene.',
    kind: 'creative',
    theme: 'forest',
    emoji: '🌳',
    color: 'leaf',
    minutes: 10,
    xp: 20,
    instructions: [
      'Pick a background.',
      'Tap stamps to add them to the scene.',
      'Use the eraser to remove.',
      'Save when you are happy with it.',
    ],
  },
  {
    id: 'highlands-trail',
    title: 'Highlands Trail',
    summary: 'Choose the safest path up the mountain.',
    description:
      'A short decision-making challenge. Pick safe trail choices and learn about the highlands.',
    kind: 'challenge',
    theme: 'highlands',
    emoji: '⛰️',
    color: 'orange',
    minutes: 4,
    xp: 25,
    instructions: [
      'Read each trail choice.',
      'Pick the safest option.',
      'Reach the summit to finish.',
    ],
  },
]

export function getActivity(id) {
  return activities.find((a) => a.id === id) ?? null
}