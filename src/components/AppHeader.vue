<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const mobileOpen = ref(false)

const nav = [
  { label: 'Home',         to: '/' },
  { label: 'Play Zone',    to: '/play' },
  { label: 'Shop',         to: '/shop' },
  { label: 'Experiences',  to: '/experiences' },
]

const secondary = [
  { label: 'My Progress', to: '/progress' },
  { label: 'Parent Area', to: '/parent' },
]

function isActive(to) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-forest/10">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
      <RouterLink to="/" class="flex items-center gap-2 shrink-0" aria-label="Kijiji Adventures home">
        <span class="w-9 h-9 rounded-full bg-leaf grid place-items-center text-white font-display font-bold">K</span>
        <span class="font-display font-bold text-forest text-lg hidden sm:inline">Kijiji Adventures</span>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-1 ml-4" aria-label="Primary">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="px-4 h-10 rounded-full font-display font-semibold text-forest/80 hover:text-forest hover:bg-forest/5 inline-flex items-center"
          :class="isActive(item.to) ? 'bg-forest/10 text-forest' : ''"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="ml-auto hidden md:flex items-center gap-2">
        <RouterLink
          v-for="item in secondary"
          :key="item.to"
          :to="item.to"
          class="px-3 h-10 rounded-full text-sm font-semibold text-forest/70 hover:text-forest hover:bg-forest/5 inline-flex items-center"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <button
        class="md:hidden ml-auto w-11 h-11 rounded-full bg-white border border-forest/10 grid place-items-center"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path v-if="!mobileOpen" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div v-if="mobileOpen" id="mobile-nav" class="md:hidden border-t border-forest/10 bg-cream">
      <nav class="px-4 py-3 grid gap-1" aria-label="Mobile">
        <RouterLink
          v-for="item in [...nav, ...secondary]"
          :key="item.to"
          :to="item.to"
          class="h-12 px-4 rounded-xl flex items-center font-display font-semibold text-forest hover:bg-forest/5"
          @click="mobileOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>