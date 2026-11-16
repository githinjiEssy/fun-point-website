/** @type {import('./types').Experience[]} */
export const experiences = [
  {
    id: 'workshop-paint',
    title: 'Paint & Play Workshop',
    category: 'workshop',
    price: 1500,
    summary: 'A 90-minute guided painting session for young artists.',
    description:
      'Guided by a local artist, children paint a savannah scene and take their artwork home.',
    emoji: '🖌️',
    color: 'coral',
    durationMins: 90,
    ageRange: '8–12',
    sessions: ['Sat 10:00', 'Sat 14:00', 'Sun 11:00'],
  },
  {
    id: 'birthday-explorer',
    title: 'Explorer Birthday Package',
    category: 'birthday',
    price: 12000,
    summary: 'A themed 2-hour birthday adventure for up to 10 children.',
    description:
      'Includes decorations, games, a snack, and a take-home activity kit. Parent supervision required.',
    emoji: '🎂',
    color: 'sun',
    durationMins: 120,
    ageRange: '6–12',
    sessions: ['Fri 15:00', 'Sat 11:00', 'Sun 15:00'],
  },
  {
    id: 'holiday-programme',
    title: 'Holiday Explorer Programme',
    category: 'holiday',
    price: 4500,
    summary: 'A 3-day programme of games, crafts, and outdoor discovery.',
    description:
      'Daily from 9:00–13:00. Includes a light snack, materials, and a certificate.',
    emoji: '🏕️',
    color: 'leaf',
    durationMins: 720,
    ageRange: '8–12',
    sessions: ['Mon–Wed', 'Wed–Fri'],
  },
  {
    id: 'group-reef',
    title: 'Reef Group Session',
    category: 'group',
    price: 3500,
    summary: 'A group creative and learning session for schools or parties.',
    description:
      '60 minutes of activities themed around coastal environments. Suitable for groups of 6–20.',
    emoji: '🐠',
    color: 'sky',
    durationMins: 60,
    ageRange: '8–12',
    sessions: ['By arrangement'],
  },
]

export const experienceCategories = [
  { id: 'workshop',  label: 'Workshops',     emoji: '🖌️' },
  { id: 'birthday',  label: 'Birthdays',     emoji: '🎂' },
  { id: 'holiday',   label: 'Holiday Programmes', emoji: '🏕️' },
  { id: 'group',     label: 'Group Sessions', emoji: '🐠' },
]

export function getExperience(id) {
  return experiences.find((e) => e.id === id) ?? null
}