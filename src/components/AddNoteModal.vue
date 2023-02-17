<script setup>
import DeleteIcon from './icons/DeleteIcon.vue'
import NoteBox from './NoteBox.vue'
import { ref } from 'vue';

const note = ref('');
</script>

<template>
  <div class="modal shown">
    <a class="modal-overlay close-btn" aria-label="Close"></a>
    <div class="modal-content">
      <div class="modal-header">
        <a class="close-btn" aria-label="Close">
          <span class="icon">
            <DeleteIcon />
          </span>
        </a>
      </div>
      <div class="modal-body">
        <h3>✍️ Describe your mood in 140 characters</h3>
        <div class="note-wrapper">
          <NoteBox v-model="note" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="add-btn">Add a note</button>
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
  background-color: #36363680;
}

.modal .modal-content {
  background-color: #fff;
  padding: 0;
  display: block;
  border-radius: 3px;
  box-shadow: 0 0.4rem 1rem #3636364d;
  z-index: 1;
  max-width: 40rem;
}

.modal .modal-content .modal-header {
  padding: 1rem 2.5rem;
  text-align: right;
}

.modal .modal-content .modal-body {
  padding: 1rem 2.5rem;
  overflow-y: auto;
  max-height: 50vh;
  position: relative;
  text-align: left;
}

.modal .modal-content .modal-footer {
  padding: 1rem 2.5rem;
  text-align: left;
}

.modal-footer .add-btn {
  border-color: #646cff;
}

.modal-content .note-wrapper {
  padding: 1em;
  background-color: #e5f6f8;
}
</style>