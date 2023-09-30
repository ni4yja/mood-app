<script setup>
import { useThemeStore } from '../stores/theme.js'

const themeStore = useThemeStore()

const props = defineProps({
  text: {
    type: String,
  },
  view: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary', 'excellent', 'good', 'awful'].includes(value)
    }
  },
  icon: {
    type: String,
  },
})
</script>

<template>
  <button class="button" :class="`${themeStore.selectedTheme.mode}-button--${props.view}`">
    <slot>
      <Icon v-if="props.icon" :name="props.icon" />
      <span>{{ props.text }}</span>
    </slot>
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

.light-button--excellent {
  color: var(--light-button-text-color-excellent);
  background: var(--light-button-bg-color-excellent);
  border-color: var(--light-button-border-color-excellent);
}

.light-button--excellent:hover {
  background: var(--light-button-bg-color-hover-excellent);
}

.light-button--excellent:focus,
.light-button--excellent:focus-visible {
  outline: 4px auto var(--light-button-outline-color-focus-excellent);
}

.dark-button--excellent {
  color: var(--dark-button-text-color-excellent);
  background: var(--dark-button-bg-color-excellent);
  border-color: var(--dark-button-border-color-excellent);
}

.dark-button--excellent:hover {
  border-color: var(--dark-button-border-color-hover-excellent);
}

.dark-button--excellent:focus,
.dark-button--excellent:focus-visible {
  outline: 4px auto var(--dark-button-outline-color-focus-excellent);
}

.light-button--good {
  color: var(--light-button-text-color-good);
  background: var(--light-button-bg-color-good);
  border-color: var(--light-button-border-color-good);
}

.light-button--good:hover {
  background: var(--light-button-bg-color-hover-good);
}

.dark-button--good {
  color: var(--dark-button-text-color-good);
  background: var(--dark-button-bg-color-good);
  border-color: var(--dark-button-border-color-good);
}

.dark-button--good:hover {
  border-color: var(--dark-button-border-color-hover-good);
}

.light-button--awful {
  color: var(--light-button-text-color-awful);
  background: var(--light-button-bg-color-awful);
  border-color: var(--light-button-border-color-awful);
}

.light-button--awful:hover {
  background: var(--light-button-bg-color-hover-awful);
}

.dark-button--awful {
  color: var(--dark-button-text-color-awful);
  background: var(--dark-button-bg-color-awful);
  border-color: var(--dark-button-border-color-awful);
}

.dark-button--awful:hover {
  border-color: var(--dark-button-border-color-hover-awful);
}

.dark-button--awful:focus,
.dark-button--awful:focus-visible {
  outline: 4px auto var(--dark-button-outline-color-focus-awful);
}
</style>