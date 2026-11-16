<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const immersive = computed(() => route.meta.immersive === true)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-cream">
    <AppHeader v-if="!immersive" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter v-if="!immersive" />
  </div>
</template>