import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { getExperience } from '../stores/experiences'

export const useBookingStore = defineStore('bookings', () => {
  /** @type {import('vue').Ref<{ id: string, experienceId: string, session: string, date: string, children: number, notes: string, createdAt: string, status: 'confirmed' }[]>} */
  const list = useStorage('kijiji.bookings', [])

  const detailed = computed(() =>
    list.value
      .map((b) => {
        const experience = getExperience(b.experienceId)
        return experience ? { ...b, experience } : null
      })
      .filter(Boolean)
  )

  function create({ experienceId, session, date, children, notes }) {
    const id = `BK-${Date.now().toString(36).toUpperCase()}`
    list.value.unshift({
      id,
      experienceId,
      session,
      date,
      children,
      notes,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    })
    return id
  }

  return { list, detailed, create }
})