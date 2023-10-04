<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme.js'
import BaseButton from './BaseButton.vue'

const themeStore = useThemeStore()

const toggleThemeButtonIcon = computed(() => {
  if (themeStore.selectedTheme.mode === 'light') {
    return 'MoonIcon';
  } else {
    return 'SunIcon';
  }
})
</script>

<template>
  <div :class="themeStore.selectedTheme.mode" class="sidebar-menu-container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/" custom v-slot="{ navigate, isActive, isExactActive }">
            <BaseButton :icon="'HomeIcon'" :view="'tetriary'" :size="'medium'" @click="navigate"
              @keypress.enter="navigate" role="link"
              :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" />
          </router-link>
        </li>
        <li>
          <router-link to="/stats" custom v-slot="{ navigate, isActive, isExactActive }">
            <BaseButton :icon="'StatsIcon'" :view="'tetriary'" :size="'medium'" @click="navigate"
              @keypress.enter="navigate" role="link"
              :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" />
          </router-link>
        </li>
      </ul>
    </div>
    <BaseButton class="toggle-theme" :icon="toggleThemeButtonIcon" :view="'tetriary'" :size="'medium'"
      @click="themeStore.toggleTheme" />
  </div>
</template>

<style scoped>
.sidebar-menu-container {
  position: fixed;
  height: 6rem;
  bottom: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

.light.sidebar-menu-container {
  background: var(--light-bg-color);
  box-shadow: inset 0px 1px 0px var(--light-box-shadow);
}

.dark.sidebar-menu-container {
  background: var(--dark-bg-color);
  box-shadow: inset 0px 1px 0px var(--dark-box-shadow);
}

.sidebar-menu-container ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.sidebar-menu-container .router-link-exact-active {
  color: var(--light-button-color-hover-tetriary);
}

@media (min-width: 768px) {
  .sidebar-menu-container {
    width: 6rem;
    height: 100vh;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 4fr max-content min-content;
    row-gap: 3em;

    grid-template-areas:
      "."
      "nav"
      "toggle-theme"
      ".";

    text-align: center;
  }

  .sidebar-menu-container .nav {
    grid-area: nav;
  }

  .sidebar-menu-container .toggle-theme {
    grid-area: toggle-theme;
    margin: 0 auto;
  }

  .light.sidebar-menu-container {
    box-shadow: inset -1px 0px 0px var(--light-box-shadow);
  }

  .dark.sidebar-menu-container {
    box-shadow: inset -1px 0px 0px var(--dark-box-shadow);
  }

  .sidebar-menu-container ul {
    display: initial;
  }

  .sidebar-menu-container li {
    margin: 1rem 0;
  }
}
</style>
