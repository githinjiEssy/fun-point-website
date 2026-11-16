import { defineStore } from 'pinia'
import { ref } from 'vue'

let seq = 0
export const useToastStore = defineStore('toast', () => {
  const list = ref([])
  function push(message, { tone = 'leaf', timeout = 3000 } = {}) {
    const id = ++seq
    list.value.push({ id, message, tone })
    if (timeout) setTimeout(() => dismiss(id), timeout)
    return id
  }
  function dismiss(id) {
    list.value = list.value.filter((t) => t.id !== id)
  }
  return { list, push, dismiss }
})