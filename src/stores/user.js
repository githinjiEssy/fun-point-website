import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const role = useStorage('kijiji.role', 'child') // 'child' | 'parent'
  const name = useStorage('kijiji.name', 'Amani')

  function setRole(r) {
    role.value = r
  }

  return { role, name, setRole }
})