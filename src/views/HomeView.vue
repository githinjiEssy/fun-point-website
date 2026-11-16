<script setup>
import { activities } from '../stores/activities'
import { products } from '../stores/products'
import { experiences } from '../stores/experiences'
import { useCartStore } from '../stores/cart'
import { useProgressStore } from '../stores/progress'
import { useToastStore } from '../stores/toast'
import AppButton from '../components/ui/AppButton.vue'

const cart = useCartStore()
const progress = useProgressStore()
const toast = useToastStore()
</script>

<template>
  <main class="p-8 max-w-4xl mx-auto">
    <h1 class="text-4xl mb-2">Data layer smoke test</h1>
    <p class="mb-6 text-forest/70">
      Activities: {{ activities.length }} · Products: {{ products.length }} · Experiences: {{ experiences.length }}
    </p>

    <section class="mb-8">
      <h2 class="text-xl mb-2">Cart</h2>
      <p>Items: {{ cart.count }} · Subtotal: KES {{ cart.subtotal }}</p>
      <div class="flex gap-2 mt-3">
        <AppButton @click="cart.add('savannah-puzzle-100'); toast.push('Added to cart 🌟')">
          Add puzzle to cart
        </AppButton>
        <AppButton variant="ghost" @click="cart.clear()">Clear</AppButton>
      </div>
    </section>

    <section>
      <h2 class="text-xl mb-2">Progress</h2>
      <p>XP: {{ progress.totalXp }} · Completed: {{ progress.completedCount }} / {{ activities.length }}</p>
      <div class="flex gap-2 mt-3 flex-wrap">
        <AppButton
          v-for="a in activities"
          :key="a.id"
          :variant="progress.isComplete(a.id) ? 'ghost' : 'secondary'"
          size="sm"
          @click="progress.complete(a.id, a.xp); toast.push(`Completed ${a.title}!`, { tone: 'sun' })"
        >
          {{ progress.isComplete(a.id) ? '✓ ' : '' }}{{ a.title }}
        </AppButton>
      </div>
    </section>
  </main>
</template>