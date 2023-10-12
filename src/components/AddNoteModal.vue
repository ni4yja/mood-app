<script setup>
import NoteBox from './NoteBox.vue'
import { ref, computed } from 'vue'
import { useCalendarStore } from '../stores/mood'
import { useThemeStore } from '../stores/theme.js'
import BaseButton from './BaseButton.vue'

const calendarStore = useCalendarStore()
const themeStore = useThemeStore()

const note = ref('')

const props = defineProps({
  isModalOpen: Boolean,
  todayRecord: Object
})

const textForMood = computed(() => props.todayRecord.mood.toLowerCase())

const emit = defineEmits(['hideModal'])

const closeModal = () => {
  emit('hideModal')
}

const addNote = (note) => {
  if (note.length) {
    calendarStore.setMemories(props.todayRecord, note)
  }
}
</script>

<template>
  <div
    class="modal"
    :class="[{ shown: isModalOpen }, themeStore.selectedTheme.mode]"
  >
    <a class="modal-overlay" @click="closeModal()"></a>

    <div class="modal-content">
      <div class="modal-header">
        <BaseButton
          :icon="'DeleteIcon'"
          :view="'secondary'"
          @click="closeModal()"
        />
      </div>
      <div class="modal-body">
        <h3>
          ✍️ Describe your
          <em :class="todayRecord.color">{{ textForMood }}</em> mood in 140
          characters
        </h3>
        <div class="note-wrapper">
          <NoteBox v-model="note" />
        </div>
      </div>
      <div class="modal-footer">
        <BaseButton :text="'Save'" @click="addNote(note)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  padding: 1rem;
  display: none;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.modal.shown {
  display: flex;
  opacity: 1;
  z-index: 999;
  pointer-events: auto;
}

.modal.shown .modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
}

.modal.shown.light .modal-overlay {
  background: var(--light-modal-overlay-bg);
}

.modal.shown.dark .modal-overlay {
  background: var(--dark-modal-overlay-bg);
}

.modal .modal-content {
  padding: 0;
  display: block;
  border-radius: 3px;
  z-index: 1;
  max-width: 40rem;
}

.modal.light .modal-content {
  background: var(--light-modal-content-bg);
  box-shadow: 0 0.4rem 1rem var(--light-modal-content-shadow);
}

.modal.dark .modal-content {
  background: var(--dark-modal-content-bg);
  box-shadow: 0 0.4rem 1rem var(--dark-modal-content-shadow);
}

.modal .modal-content .modal-header {
  padding: 1.5rem 0 1rem;
  text-align: right;
}

.modal .modal-content .modal-body {
  padding: 1rem 1.5rem;
  overflow-y: auto;
  max-height: 50vh;
  position: relative;
  text-align: left;
}

.modal .modal-content .modal-body h3 {
  margin-top: 0;
}

.modal .modal-content .modal-footer {
  padding: 1rem 1.5rem;
  text-align: left;
}

.modal-content .note-wrapper {
  padding: 1em;
  background: var(--light-gray);
}

h3 em {
  font-weight: 700;
}

h3 em.purple {
  color: var(--mood-excellent-primary);
}

h3 em.green {
  color: var(--mood-good-primary);
}

h3 em.red {
  color: var(--mood-awful-primary);
}
</style>
