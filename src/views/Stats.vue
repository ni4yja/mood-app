<script setup>
import { ref } from 'vue'
import SidebarMenu from '../components/SidebarMenu.vue'
import StatsByPeriod from '../components/StatsByPeriod.vue'

const isWeeklyStatsShown = ref(true)

const toggleSwitcher = () => isWeeklyStatsShown.value = !isWeeklyStatsShown.value
</script>

<template>
  <div class="page-wrapper stats">
    <SidebarMenu />
    <div class="main-container">
      <div class="header">
        <h1>See your stats</h1>
        <label class="switch">
          <input type="checkbox" @click="toggleSwitcher" checked>
          <div class="slider round"></div>
          <span class="labels" data-on="Weekly" data-off="Monthly"></span>
        </label>
      </div>
      <StatsByPeriod v-if="isWeeklyStatsShown" :period-name="'week'" />
      <StatsByPeriod v-if="!isWeeklyStatsShown" :period-name="'month'" />
      <div class="empty">Hello, darkness, my old friend 🦄</div>
    </div>
  </div>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 8rem;
  height: 44px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #646cff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 30px;
  width: 30px;
  left: 7px;
  bottom: 7px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #646cff;
}

input:focus+.slider {
  box-shadow: 0 0 1px #646cff;
}

input:checked+.slider:before {
  -webkit-transform: translateX(80px);
  -ms-transform: translateX(80px);
  transform: translateX(80px);
}

.slider.round {
  border-radius: 44px;
}

.slider.round:before {
  border-radius: 50%;
}

.switch .labels {
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.4s ease-in-out;
  font-weight: 500;
}

.switch .labels::after {
  content: attr(data-off);
  position: absolute;
  right: 15px;
  color: #fff;
  opacity: 1;
  transition: all 0.4s ease-in-out;
}

.switch .labels::before {
  content: attr(data-on);
  position: absolute;
  left: 15px;
  color: #ffffff;
  opacity: 0;
  transition: all 0.4s ease-in-out;
}

.switch input:checked~.labels::after {
  opacity: 0;
}

.switch input:checked~.labels::before {
  opacity: 1;
}
</style>
