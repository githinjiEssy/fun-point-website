import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { activities } from '../stores/activities'

export const useProgressStore = defineStore('progress', () => {
  /** @type {import('vue').Ref<Record<string, { completedAt: string, xp: number }>>} */
  const completed = useStorage('kijiji.progress', {})

  const totalXp = computed(() =>
    Object.values(completed.value).reduce((s, r) => s + (r.xp || 0), 0)
  )

  const completedCount = computed(() => Object.keys(completed.value).length)

  const badges = computed(() => {
    const list = []
    const c = completed.value
    if (completedCount.value >= 1) list.push({ id: 'first-step', label: 'First Step', emoji: '🌟' })
    if (c['savannah-match'])      list.push({ id: 'savannah',  label: 'Savannah Scout', emoji: '🦁' })
    if (c['coral-puzzle'])        list.push({ id: 'reef',      label: 'Reef Explorer',  emoji: '🐠' })
    if (c['forest-studio'])       list.push({ id: 'forest',    label: 'Forest Maker',   emoji: '🌳' })
    if (c['highlands-trail'])     list.push({ id: 'highlands', label: 'Highland Hiker', emoji: '⛰️' })
    if (completedCount.value === activities.length)
      list.push({ id: 'all', label: 'All-Rounder', emoji: '🏆' })
    return list
  })

  function isComplete(id) {
    return Boolean(completed.value[id])
  }

  function complete(id, xp = 0) {
    if (completed.value[id]) return
    completed.value[id] = { completedAt: new Date().toISOString(), xp }
  }

  function reset() {
    completed.value = {}
  }

  return { completed, totalXp, completedCount, badges, isComplete, complete, reset }
})