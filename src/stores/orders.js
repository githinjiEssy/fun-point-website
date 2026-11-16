import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useOrderStore = defineStore('orders', () => {
  /** @type {import('vue').Ref<{ id: string, createdAt: string, total: number, items: any[], name: string, email: string }[]>} */
  const list = useStorage('kijiji.orders', [])

  function create({ total, items, name, email }) {
    const id = `ORD-${Date.now().toString(36).toUpperCase()}`
    list.value.unshift({ id, createdAt: new Date().toISOString(), total, items, name, email })
    return id
  }

  return { list, create }
})