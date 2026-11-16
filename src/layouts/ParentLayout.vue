<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const tabs = [
  { label: 'Overview',  to: '/parent',          exact: true },
  { label: 'Purchases', to: '/parent/purchases' },
  { label: 'Bookings',  to: '/parent/bookings'  },
  { label: 'Settings',  to: '/parent/settings'  },
]
function active(t) {
  return t.exact ? route.path === t.to : route.path.startsWith(t.to)
}
</script>

<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-forest text-cream">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        <RouterLink to="/" class="text-cream/70 hover:text-white text-sm font-semibold">← Back to site</RouterLink>
        <div class="ml-auto font-display font-bold">Parent Area</div>
      </div>
      <nav class="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto" aria-label="Parent">
        <RouterLink
          v-for="t in tabs"
          :key="t.to"
          :to="t.to"
          class="h-12 px-4 inline-flex items-center font-display font-semibold whitespace-nowrap border-b-4"
          :class="active(t) ? 'border-sun text-white' : 'border-transparent text-cream/70 hover:text-white'"
        >
          {{ t.label }}
        </RouterLink>
      </nav>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>