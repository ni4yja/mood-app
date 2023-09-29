<script setup>
import { useThemeStore } from '../stores/theme.js'

const themeStore = useThemeStore()

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  view: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value)
    }
  }
})
</script>

<template>
  <button class="button" :class="`${themeStore.selectedTheme.mode}-button--${props.view}`">
    <slot><span>{{ props.text }}</span></slot>
  </button>
</template>

<style scoped>
.button {
  border-radius: 8px;
  border: 2px solid transparent;
  background: transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}

.light-button--primary {
  color: var(--light-button-text-color-primary);
  background: var(--light-button-bg-color-primary);
  border-color: var(--light-button-border-color-primary);
}

.light-button--primary:hover {
  border-color: var(--light-button-border-color-hover-primary);
}

.light-button--primary:focus,
.light-button--primary:focus-visible {
  outline: 4px auto var(--light-button-outline-color-focus-primary);
}

.dark-button--primary {
  color: var(--dark-button-text-color-primary);
  background: var(--dark-button-bg-color-primary);
  border-color: var(--dark-button-border-color-primary);
}

.dark-button--primary:hover {
  border-color: var(--dark-button-border-color-hover-primary);
}

.dark-button--primary:focus,
.dark-button--primary:focus-visible {
  outline: 4px auto var(--dark-button-outline-color-focus-primary);
}
</style>