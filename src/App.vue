<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

const route = useRoute()
const isParent = computed(() => route.path.startsWith('/parent'))
</script>

<template>
  <RouterView v-if="isParent" />
  <DefaultLayout v-else>
    <RouterView />
  </DefaultLayout>
</template>