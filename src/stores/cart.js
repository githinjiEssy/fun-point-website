import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { getProduct } from '../stores/products'

export const useCartStore = defineStore('cart', () => {
  /** @type {import('vue').Ref<{ productId: string, qty: number }[]>} */
  const items = useStorage('kijiji.cart', [])
  const lastAddedId = ref(null)

  const detailed = computed(() =>
    items.value
      .map((line) => {
        const product = getProduct(line.productId)
        if (!product) return null
        return { ...line, product, subtotal: product.price * line.qty }
      })
      .filter(Boolean)
  )

  const count = computed(() => items.value.reduce((n, l) => n + l.qty, 0))
  const subtotal = computed(() => detailed.value.reduce((s, l) => s + l.subtotal, 0))
  const isEmpty = computed(() => items.value.length === 0)

  function add(productId, qty = 1) {
    const existing = items.value.find((l) => l.productId === productId)
    if (existing) existing.qty += qty
    else items.value.push({ productId, qty })
    lastAddedId.value = productId
    setTimeout(() => { if (lastAddedId.value === productId) lastAddedId.value = null }, 1500)
  }

  function setQty(productId, qty) {
    if (qty <= 0) return remove(productId)
    const line = items.value.find((l) => l.productId === productId)
    if (line) line.qty = qty
  }

  function remove(productId) {
    items.value = items.value.filter((l) => l.productId !== productId)
  }

  function clear() {
    items.value = []
  }

  // Auto-clean orphaned product ids (protects against data changes)
  watch(items, (v) => {
    const valid = v.filter((l) => getProduct(l.productId))
    if (valid.length !== v.length) items.value = valid
  }, { deep: true })

  return { items, detailed, count, subtotal, isEmpty, lastAddedId, add, setQty, remove, clear }
})