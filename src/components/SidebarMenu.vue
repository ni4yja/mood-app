<script setup>
import HomeIcon from './icons/HomeIcon.vue'
import MoonIcon from './icons/MoonIcon.vue'
import SunIcon from './icons/SunIcon.vue'
import StatsIcon from './icons/StatsIcon.vue'
import { useThemeStore } from '../stores/theme.js'

const themeStore = useThemeStore()
</script>

<template>
  <div class="sidebar-menu-container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/">
            <HomeIcon />
          </router-link>
        </li>
        <li>
          <router-link to="/stats">
            <StatsIcon />
          </router-link>
        </li>
      </ul>
    </div>
    <button class="toggle-theme-button" @click="themeStore.toggleTheme">
      <MoonIcon v-if="themeStore.selectedTheme.mode === 'light'" />
      <SunIcon v-if="themeStore.selectedTheme.mode === 'dark'" />
    </button>
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

.sidebar-menu-container a,
.sidebar-menu-container button {
  display: block;
  padding: 0.8rem 1rem;
  background: #f9f9f9;
  border-radius: 1rem;
  color: #ada9bb;
  position: relative;
}

.sidebar-menu-container a.router-link-exact-active,
.sidebar-menu-container button:active {
  color: #646cff;
}

.sidebar-menu-container button:focus {
  outline: none;
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
