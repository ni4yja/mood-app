<script setup>
import ExcellentMoodIcon from './icons/ExcellentMoodIcon.vue'
import GoodMoodIcon from './icons/GoodMoodIcon.vue'
import AwfulMoodIcon from './icons/AwfulMoodIcon.vue'

const props = defineProps({
  mood: {
    type: String
  },
  count: {
    type: Number
  }
})
</script>

<template>
  <div class="day-card-stats" :class="mood.toLowerCase()">
    <div class="mood-label">
      <p>
        <span class="mood-icon">
          <ExcellentMoodIcon v-if="mood === 'Excellent'" />
          <GoodMoodIcon v-if="mood === 'Good'" />
          <AwfulMoodIcon v-if="mood === 'Awful'" />
        </span>
        <span>{{ mood }}</span>
      </p>
    </div>
    <div class="day-count">
      <h2>{{ count }}</h2>
    </div>
  </div>
</template>

<style>
.day-card-stats {
  width: 100%;
  border: 1px solid #f3f3f4;
  border-radius: 1rem;
  text-align: center;
}

.day-count h2 {
  font-size: 3rem;
}

.mood-label p {
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.mood-icon {
  display: inline-flex;
  margin: 1rem;
  padding: 0.4rem;
  border-radius: 30%;
}

.excellent .mood-icon {
  color: var(--mood-excellent-secondary);
  background: var(--mood-excellent-tetriary);
}

.good .mood-icon {
  color: var(--mood-good-secondary);
  background: var(--mood-good-tetriary);
}

.awful .mood-icon {
  color: var(--mood-awful-secondary);
  background: var(--mood-awful-tetriary);
}
</style>
