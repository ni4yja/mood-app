import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () =>
    useStorage('theme', {
      theme: [
        {
          mode: 'light',
          active: true
        },
        {
          mode: 'dark',
          active: false
        }
      ]
    }),
  actions: {
    toggleTheme() {
      this.theme = this.theme.map((mode) => ({
        ...mode,
        active: !mode.active
      }))
    }
  },
  getters: {
    selectedTheme(state) {
      return state.theme.find((mode) => mode.active)
    }
  }
})
