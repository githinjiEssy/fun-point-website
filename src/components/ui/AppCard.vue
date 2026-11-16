<script setup>
defineProps({
  to: { type: [String, Object], default: null },
  as: { type: String, default: null }, // override element
  interactive: { type: Boolean, default: false },
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : as || 'div'"
    :to="to || undefined"
    class="block rounded-lg bg-white shadow-sm border border-brown/5 transition-all duration-150"
    :class="interactive || to ? 'hover:shadow-md hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky/60' : ''"
  >
    <slot />
  </component>
</template>