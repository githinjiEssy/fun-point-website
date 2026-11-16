<script setup>
import AppCard from '../ui/AppCard.vue'
import AppBadge from '../ui/AppBadge.vue'
import { useProgressStore } from '../../stores/progress'

const props = defineProps({
  activity: { type: Object, required: true },
})

const progress = useProgressStore()

const kindLabels = { game: 'Game', challenge: 'Challenge', creative: 'Creative' }
const kindTones = { game: 'sun', challenge: 'coral', creative: 'leaf' }
const tintMap = {
  leaf: 'bg-leaf/15',
  sun: 'bg-sun/20',
  orange: 'bg-orange/15',
  sky: 'bg-sky/20',
  coral: 'bg-coral/15',
  forest: 'bg-forest/10',
}
</script>

<template>
  <AppCard :to="`/play/${activity.id}`" interactive class="overflow-hidden">
    <div class="relative aspect-[4/3] grid place-items-center" :class="tintMap[activity.color] ?? 'bg-cream'">
      <span class="text-6xl" aria-hidden="true">{{ activity.emoji }}</span>
      <span v-if="progress.isComplete(activity.id)" class="absolute top-3 right-3 bg-leaf text-white rounded-full w-8 h-8 grid place-items-center text-sm font-bold" aria-label="Completed">✓</span>
    </div>
    <div class="p-4">
      <div class="flex items-center gap-2 mb-2">
        <AppBadge :tone="kindTones[activity.kind]">{{ kindLabels[activity.kind] }}</AppBadge>
        <span class="text-xs text-brown/60">{{ activity.minutes }} min · +{{ activity.xp }} XP</span>
      </div>
      <h3 class="text-lg font-display">{{ activity.title }}</h3>
      <p class="text-sm text-brown/70 mt-1 line-clamp-2">{{ activity.summary }}</p>
    </div>
  </AppCard>
</template>