<script setup>
defineProps({
  tone: { type: String, default: 'neutral' }, // neutral | sun | leaf | coral | sky
})

const tones = {
  neutral: 'bg-brown/10 text-brown',
  sun:     'bg-sun text-forest',
  leaf:    'bg-leaf/15 text-forest',
  coral:   'bg-coral/15 text-coral',
  sky:     'bg-sky/20 text-forest',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold font-display"
    :class="tones[tone] ?? tones.neutral"
  >
    <slot />
  </span>
</template>