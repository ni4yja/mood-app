<script setup>
import HomeIcon from './icons/HomeIcon.vue'
import StatsIcon from './icons/StatsIcon.vue'
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
}

.sidebar-menu-container ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-menu-container a {
  display: block;
  padding: 0.8rem 1rem;
  background: #f9f9f9;
  border-radius: 1rem;
  color: #ADA9BB;
  position: relative;
}

.sidebar-menu-container a.router-link-exact-active {
  color: #646cff;
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

  .sidebar-menu-container li {
    margin: 1rem 0;
  }

  .sidebar-menu-container a:after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: transparent;
    right: -1.2rem;
    top: 0;
  }

  .sidebar-menu-container a.router-link-exact-active:after {
    background: #646cff;
  }
}
</style>