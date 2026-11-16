<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '../../components/ui/AppButton.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import { getActivity } from '../../stores/activities'
import { useProgressStore } from '../../stores/progress'

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()

const activity = computed(() => getActivity(route.params.activityId))

const complete = computed(() => activity.value && progress.isComplete(activity.value.id))

const tintMap = {
  sun: 'bg-sun/25', leaf: 'bg-leaf/15', orange: 'bg-orange/15',
  sky: 'bg-sky/20', coral: 'bg-coral/15', forest: 'bg-forest/10',
}

function start() {
  router.push(`/play/${activity.value.id}/run`)
}
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <div v-if="!activity" class="text-center py-20">
      <h1 class="text-2xl">Activity not found</h1>
      <p class="text-brown/70 mt-2">That activity doesn't exist. Try the Play Zone.</p>
      <AppButton to="/play" class="mt-6">Back to Play Zone</AppButton>
    </div>

    <template v-else>
      <button
        type="button"
        class="text-sm font-semibold text-forest/70 hover:text-forest mb-4"
        @click="router.back()"
      >
        ← Back
      </button>

      <div class="rounded-2xl overflow-hidden bg-white border border-forest/10">
        <div class="aspect-[16/9] grid place-items-center relative" :class="tintMap[activity.color]">
          <span class="text-[8rem]" aria-hidden="true">{{ activity.emoji }}</span>
          <span v-if="complete" class="absolute top-4 right-4 bg-leaf text-white rounded-full px-4 py-1 text-sm font-bold font-display">
            ✓ Completed
          </span>
        </div>

        <div class="p-6 md:p-8">
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <AppBadge tone="sun">{{ activity.kind }}</AppBadge>
            <span class="text-sm text-brown/60">{{ activity.minutes }} min · +{{ activity.xp }} XP</span>
          </div>

          <h1 class="text-3xl md:text-4xl">{{ activity.title }}</h1>
          <p class="text-lg text-brown/75 mt-3 max-w-2xl">{{ activity.description }}</p>

          <section class="mt-8">
            <h2 class="text-xl mb-3">How to play</h2>
            <ol class="space-y-2">
              <li
                v-for="(step, i) in activity.instructions"
                :key="i"
                class="flex gap-3 items-start"
              >
                <span class="shrink-0 w-7 h-7 rounded-full bg-forest text-white grid place-items-center font-display font-bold text-sm">
                  {{ i + 1 }}
                </span>
                <span class="text-brown/80 pt-1">{{ step }}</span>
              </li>
            </ol>
          </section>

          <div class="mt-8 flex flex-wrap gap-3">
            <AppButton size="lg" variant="primary" @click="start">
              {{ complete ? 'Play again' : 'Start activity' }}
            </AppButton>
            <AppButton to="/play" variant="ghost" size="lg">Back to Play Zone</AppButton>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>