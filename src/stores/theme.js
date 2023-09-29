import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
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
