<script setup>
import { useToastStore } from '../../stores/toast'
const toast = useToastStore()
const toneMap = {
  leaf:   'bg-leaf text-white',
  sun:    'bg-sun text-forest',
  coral:  'bg-coral text-white',
  sky:    'bg-sky text-forest',
}
</script>

<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-for="t in toast.list"
        :key="t.id"
        class="pointer-events-auto rounded-full px-5 h-11 inline-flex items-center font-display font-semibold shadow-lg"
        :class="toneMap[t.tone] ?? toneMap.leaf"
        role="status"
        aria-live="polite"
      >
        {{ t.message }}
      </div>
    </TransitionGroup>
  </div>
</template>