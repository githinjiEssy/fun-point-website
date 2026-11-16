<script setup>
import AppCard from '../ui/AppCard.vue'
import AppBadge from '../ui/AppBadge.vue'
import AppButton from '../ui/AppButton.vue'
import { useCartStore } from '../../stores/cart'
import { useToastStore } from '../../stores/toast'

const props = defineProps({
  product: { type: Object, required: true },
})

const cart = useCartStore()
const toast = useToastStore()

const tintMap = {
  coral: 'bg-coral/15',
  sun: 'bg-sun/20',
  leaf: 'bg-leaf/15',
  sky: 'bg-sky/20',
  orange: 'bg-orange/15',
  forest: 'bg-forest/10',
}

function formatPrice(n) {
  return `KES ${n.toLocaleString()}`
}

function addToCart() {
  cart.add(props.product.id)
  toast.push(`Added "${props.product.name}" to cart`, { tone: 'leaf' })
}
</script>

<template>
  <AppCard interactive class="overflow-hidden flex flex-col">
    <RouterLink :to="`/shop/product/${product.id}`" class="block">
      <div class="relative aspect-[4/3] grid place-items-center" :class="tintMap[product.color] ?? 'bg-cream'">
        <span class="text-6xl" aria-hidden="true">{{ product.emoji }}</span>
      </div>
    </RouterLink>
    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-2 mb-1">
        <RouterLink :to="`/shop/product/${product.id}`" class="font-display text-lg leading-tight hover:text-forest">
          {{ product.name }}
        </RouterLink>
        <AppBadge tone="sun" class="shrink-0">{{ formatPrice(product.price) }}</AppBadge>
      </div>
      <p class="text-sm text-brown/70 line-clamp-2 mb-3">{{ product.summary }}</p>
      <AppButton
        variant="primary"
        size="sm"
        class="mt-auto"
        block
        @click="addToCart"
      >
        Add to cart
      </AppButton>
    </div>
  </AppCard>
</template>