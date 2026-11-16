/** @type {import('./types').Product[]} */
export const products = [
  {
    id: 'art-kit-junior',
    name: 'Junior Artist Kit',
    category: 'art',
    price: 1450,
    summary: 'Paints, brushes, and a sketchbook for young creators.',
    description:
      'A complete starter kit with child-safe paints, six brushes, and a 30-page sketchbook. Recommended for ages 8+.',
    emoji: '🎨',
    color: 'coral',
    tags: ['art', 'beginner'],
  },
  {
    id: 'savannah-puzzle-100',
    name: 'Savannah 100-Piece Puzzle',
    category: 'puzzles',
    price: 890,
    summary: 'A vibrant savannah scene, 100 sturdy pieces.',
    description:
      'Large-format pieces designed for small hands. Completed size 40×30 cm. Recommended ages 8–12.',
    emoji: '🧩',
    color: 'sun',
    tags: ['puzzles', 'savannah'],
  },
  {
    id: 'explorer-journal',
    name: 'Explorer Journal',
    category: 'journals',
    price: 650,
    summary: 'A hardcover journal with prompts and sketching space.',
    description:
      '80 pages with guided prompts, sticker sheets, and a pocket for treasures found on adventures.',
    emoji: '📓',
    color: 'leaf',
    tags: ['journal', 'creative'],
  },
  {
    id: 'adventure-kit-reef',
    name: 'Reef Adventure Kit',
    category: 'adventure',
    price: 2100,
    summary: 'Everything needed for a coastal explorer day.',
    description:
      'Includes magnifier, field guide, stickers, and a small reusable collecting pouch. Ages 8–12.',
    emoji: '🐚',
    color: 'sky',
    tags: ['outdoors', 'coast'],
  },
  {
    id: 'board-game-trail',
    name: 'Trailblazers Board Game',
    category: 'puzzles',
    price: 1900,
    summary: 'A cooperative family board game about exploring Kenya.',
    description:
      '2–5 players, 30–45 minutes. Work together to complete the trail before sunset.',
    emoji: '🎲',
    color: 'orange',
    tags: ['board game', 'family'],
  },
  {
    id: 'cap-explorer',
    name: 'Explorer Cap',
    category: 'accessories',
    price: 750,
    summary: 'A soft, adjustable cap with the Kijiji Adventures crest.',
    description: 'One size fits most children 6+. 100% cotton. Machine washable.',
    emoji: '🧢',
    color: 'forest',
    tags: ['apparel'],
  },
]

export const categories = [
  { id: 'art',         label: 'Art & Craft',   emoji: '🎨' },
  { id: 'puzzles',     label: 'Puzzles & Games', emoji: '🧩' },
  { id: 'adventure',   label: 'Adventure Kits', emoji: '🧭' },
  { id: 'journals',    label: 'Journals',      emoji: '📓' },
  { id: 'accessories', label: 'Accessories',   emoji: '🧢' },
]

export function getProduct(id) {
  return products.find((p) => p.id === id) ?? null
}
export function productsByCategory(category) {
  return category === 'all'
    ? products
    : products.filter((p) => p.category === category)
}