<script setup>
import AppCard from '../ui/AppCard.vue'
import AppBadge from '../ui/AppBadge.vue'

const props = defineProps({
  experience: { type: Object, required: true },
})

const tintMap = {
  coral: 'bg-coral/15',
  sun: 'bg-sun/20',
  leaf: 'bg-leaf/15',
  sky: 'bg-sky/20',
  orange: 'bg-orange/15',
}
const catLabels = { workshop: 'Workshop', birthday: 'Birthday', holiday: 'Holiday', group: 'Group' }

function formatPrice(n) {
  return `KES ${n.toLocaleString()}`
}
</script>

<template>
  <AppCard :to="`/experiences/${experience.id}`" interactive class="overflow-hidden">
    <div class="relative aspect-[4/3] grid place-items-center" :class="tintMap[experience.color] ?? 'bg-cream'">
      <span class="text-6xl" aria-hidden="true">{{ experience.emoji }}</span>
    </div>
    <div class="p-4">
      <div class="flex items-center gap-2 mb-2">
        <AppBadge tone="sky">{{ catLabels[experience.category] }}</AppBadge>
        <span class="text-xs text-brown/60">Ages {{ experience.ageRange }}</span>
      </div>
      <h3 class="text-lg font-display">{{ experience.title }}</h3>
      <p class="text-sm text-brown/70 mt-1 line-clamp-2">{{ experience.summary }}</p>
      <div class="mt-3 font-display font-semibold text-forest">{{ formatPrice(experience.price) }}</div>
    </div>
  </AppCard>
</template>