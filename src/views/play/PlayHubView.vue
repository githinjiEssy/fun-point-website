<script setup>
import { computed, ref } from 'vue'
import ActivityCard from '../../components/cards/ActivityCard.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import { activities } from '../../stores/activities'
import { useProgressStore } from '../../stores/progress'

const progress = useProgressStore()

const filters = [
  { id: 'all', label: 'All' },
  { id: 'game', label: 'Games' },
  { id: 'challenge', label: 'Challenges' },
  { id: 'creative', label: 'Creative' },
]
const activeFilter = ref('all')

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? activities
    : activities.filter((a) => a.kind === activeFilter.value)
)

const xpToNext = computed(() => {
  const next = [50, 100, 200, 350].find((t) => t > progress.totalXp)
  return next ? next - progress.totalXp : 0
})
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <header class="mb-6">
      <h1 class="text-4xl">Play Zone</h1>
      <p class="text-brown/70 mt-2 max-w-xl">
        Pick an activity, follow the instructions, and earn XP. Everything you finish is saved automatically.
      </p>
    </header>

    <!-- Progress strip -->
    <section class="rounded-2xl bg-white border border-forest/10 p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="flex-1">
        <div class="text-sm text-brown/60 font-semibold">Your XP</div>
        <div class="font-display text-3xl text-forest">{{ progress.totalXp }}</div>
      </div>
      <div class="flex-1">
        <div class="text-sm text-brown/60 font-semibold">Activities complete</div>
        <div class="font-display text-3xl text-forest">{{ progress.completedCount }} / {{ activities.length }}</div>
      </div>
      <div class="flex-1">
        <div class="text-sm text-brown/60 font-semibold">Badges</div>
        <div class="flex gap-1 mt-1 text-2xl" aria-label="Badges earned">
          <span v-if="progress.badges.length === 0" class="text-sm text-brown/50 font-body">None yet</span>
          <span v-for="b in progress.badges" :key="b.id" :title="b.label">{{ b.emoji }}</span>
        </div>
      </div>
      <AppButton to="/progress" variant="secondary" size="sm">View progress</AppButton>
    </section>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter activities">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="h-10 px-4 rounded-full font-display font-semibold text-sm border transition-colors"
        :class="activeFilter === f.id
          ? 'bg-forest text-white border-forest'
          : 'bg-white text-forest border-forest/15 hover:border-forest/40'"
        :aria-pressed="activeFilter === f.id"
        @click="activeFilter = f.id"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Grid -->
    <div v-if="filtered.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ActivityCard v-for="a in filtered" :key="a.id" :activity="a" />
    </div>
    <p v-else class="text-brown/60 py-12 text-center">No activities in this category yet.</p>
  </main>
</template>