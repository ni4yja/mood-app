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
  <div class="sidebar-menu-container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/" custom v-slot="{ navigate, isActive, isExactActive }">
            <BaseButton :icon="'HomeIcon'" :view="'tetriary'" @click="navigate" @keypress.enter="navigate" role="link"
              :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" />
          </router-link>
        </li>
        <li>
          <router-link to="/stats" custom v-slot="{ navigate, isActive, isExactActive }">
            <BaseButton :icon="'StatsIcon'" :view="'tetriary'" @click="navigate" @keypress.enter="navigate" role="link"
              :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" />
          </router-link>
        </li>
      </ul>
    </div>
    <BaseButton class="toggle-theme-button" :icon="toggleThemeButtonIcon" :view="'tetriary'"
      @click="themeStore.toggleTheme" />
  </div>
</template>

<style>
.sidebar-menu-container {
  position: fixed;
  box-shadow: inset 0px 1px 0px #f3f3f4;
  height: 6rem;
  bottom: 0;
  width: 100%;
  background: #ffffff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
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
    box-shadow: inset -1px 0px 0px #f3f3f4;
    width: 6rem;
    height: 100vh;

    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sidebar-menu-container ul {
    display: initial;
  }

  .sidebar-menu-container li {
    margin: 1rem 0;
  }
}
</style>
