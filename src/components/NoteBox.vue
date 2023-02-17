<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  limit: {
    type: Number,
    default: 140
  },
  modelValue: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

const textarea = ref(null)

const valueAllowed = computed(() => {
  return props.limit ? props.modelValue.slice(0, props.limit) : props.modelValue
})

const valueExcess = computed(() => {
  return props.limit ? props.modelValue.slice(props.limit) : ''
})

const limitStatus = computed(() => {
  return (props.modelValue.length / props.limit) * 100
})

const remainingCharacters = computed(() => {
  return props.limit - props.modelValue.length
})

const textareaStyle = computed(() => {
  return getComputedStyle(textarea.value)
})

const updateValue = (e) => {
  textareaGrow()
  emit('update:modelValue', e.target.value)
}

const textareaGrow = () => {
  const paddingTop = parseInt(
    textareaStyle.value.getPropertyValue(`padding-top`),
    10
  )
  const paddingBottom = parseInt(
    textareaStyle.value.getPropertyValue(`padding-bottom`),
    10
  )
  const lineHeight = parseInt(
    textareaStyle.value.getPropertyValue(`line-height`),
    10
  )

  textarea.value.rows = 1

  const innerHeight = textarea.value.scrollHeight - paddingTop - paddingBottom

  textarea.value.rows = innerHeight / lineHeight
}

onMounted(() => {
  textareaGrow()
})
</script>

<template>
  <div :class="[
    'note-box',
    {
      'has-exceeded-limit': limitStatus > 100
    }
  ]">
    <div :class="`note-box__htmlarea`" aria-hidden>
      {{ valueAllowed }}<em v-if="valueExcess">{{ valueExcess }}</em>
    </div>
    <textarea ref="textarea" :class="`note-box__textarea`" :value="modelValue" rows="1" @input="updateValue" />
    <div :class="`note-box__limit`">
      <span :class="`note-box__remainingCharacters`">
        {{ remainingCharacters }}
      </span>
      <svg :class="`note-box__counter`" viewBox="0 0 33.83098862 33.83098862" height="20" width="20"
        xmlns="http://www.w3.org/2000/svg">
        <circle :class="`note-box__counterUnderlay`" cx="16.91549431" cy="16.91549431" r="15.91549431" fill="none"
          stroke-width="2" />
        <circle :class="`note-box__counterProgress`" :stroke-dasharray="`${limitStatus},100`" cx="16.91549431"
          cy="16.91549431" r="15.91549431" fill="none" stroke-width="4" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.note-box {
  --color-border: #99dde6;
  --color-danger: #e0245e;
  --color-danger-light: #ffb8c2;
  --color-gray: #657786;
  --color-gray-light: #ccd6dd;
  --color-primary: #1da1f2;

  position: relative;
}

.note-box__htmlarea,
.note-box__textarea {
  padding: 1em;
  padding-right: 3.75em;
  width: 100%;
  line-height: 1.25;
  border: 2px solid transparent;
  border-radius: 0.5em;
}

.note-box__htmlarea {
  position: absolute;
  height: 100%;
  background-color: #fff;
  color: transparent;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.note-box__textarea {
  display: block;
  position: relative;
  border-color: var(--color-border);
  outline: 0;
  background-color: transparent;
  resize: none;
  font-family: inherit;
  font-size: inherit;
}

.note-box__textarea:focus {
  border-color: darken(var(--color-border), 20%);
}

em {
  background: var(--color-danger-light);
}

.note-box__limit {
  display: flex;
  position: absolute;
  right: 0.75em;
  bottom: 0.75em;
  align-items: center;
}

.note-box__remainingCharacters {
  margin-right: 0.5em;
  color: var(--color-gray);
  font-size: 0.75em;
}

.has-exceeded-limit .note-box__remainingCharacters {
  color: var(--color-danger);
}

.note-box__counter {
  overflow: visible;
  transform: rotate(-90deg);
  transform-origin: center;
}

.note-box__counterUnderlay {
  stroke: var(--color-gray-light);
}

.note-box__counterProgress {
  stroke: var(--color-primary);
}

.has-exceeded-limit .note-box__counterProgress {
  stroke: var(--color-danger);
  animation: counterPulse 0.3s ease-in-out;
  animation-iteration-count: 1;
}

@keyframes counterPulse {
  0% {
    stroke-width: 4;
  }

  50% {
    stroke-width: 6;
  }

  100% {
    stroke-width: 4;
  }
}
</style>
