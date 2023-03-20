import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs/esm/index.js'

export const useCalendarStore = defineStore({
  id: 'main',
  state: () => ({
    totalRecords: useStorage('recordList', [
      {
        date: dayjs('2023-02-28 17:00').format('YYYY-MM-DD HH:mm'),
        memory: 'Who owns my heart',
        mood: 'Excellent',
        timestamp: 1677596401.045
      },
      {
        date: dayjs('2023-03-01 09:44').format('YYYY-MM-DD HH:mm'),
        memory: 'Check this',
        mood: 'Good',
        timestamp: 1677656669.045
      },
      {
        date: dayjs('2023-03-02 09:44').format('YYYY-MM-DD HH:mm'),
        memory: 'What should I do',
        mood: 'Awful',
        timestamp: 1677165970.045
      },
      {
        date: dayjs('2023-03-03 14:00').format('YYYY-MM-DD HH:mm'),
        memory: 'Friday I am in love',
        mood: 'Excellent',
        timestamp: 1677844800.045
      }
    ])
  }),
  actions: {
    setTodayMood(date, timestamp, mood, memory) {
      const dataSet = {
        date: dayjs(date).format('YYYY-MM-DD HH:mm'),
        timestamp,
        mood,
        memory
      }
      const uniqueRecordsArr = [...new Set([...this.totalRecords, dataSet])]
      this.totalRecords = uniqueRecordsArr
    },
    setMemories(todayRecord, note) {
      this.totalRecords = this.totalRecords.map((day) => {
        if (day.timestamp === todayRecord.timestamp) {
          day = {
            ...day,
            memory: note
          }
        }
        return day
      })
    }
  },
  getters: {
    calendar(state) {
      const moodMap = new Map()
      state.totalRecords.forEach((data) => {
        // Check if there is already a mood for this day
        const existingMood = moodMap.get(data.timestamp)
        if (!existingMood || existingMood.timestamp < data.timestamp) {
          // If there is no mood for this day or the new mood is more recent,
          // add it to the map
          moodMap.set(data.timestamp, data)
        }
      })

      // Map the mood data to calendar events
      return Array.from(moodMap.values()).map((data) => {
        return {
          date: data.date,
          timestamp: data.timestamp,
          mood: data.mood,
          memory: data.memory
        }
      })
    },
    daysWithMoodColor(getters) {
      const colorMap = {
        Excellent: 'purple',
        Good: 'green',
        Awful: 'red'
      }
      return getters.calendar.map((day) => ({
        ...day,
        color: colorMap[day.mood] || null
      }))
    }
  }
})
