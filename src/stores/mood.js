import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs/esm/index.js'
import useCounters from '../helpers/store-counters.js'

const {
  countRecordsWithUniqueTimestamp,
  countRecordsWithDifference,
  countRecordsBeforeToday,
  countTodayRecords
} = useCounters()

export const useCalendarStore = defineStore({
  id: 'main',
  state: () => ({
    totalRecords: useStorage('recordList', [
      {
        date: dayjs('2023-01-31 14:00').format('YYYY-MM-DD HH:mm'),
        difference: null,
        memory:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim',
        mood: 'Good',
        timestamp: 1675187861.045
      },
      {
        date: dayjs('2023-02-23 14:00').format('YYYY-MM-DD HH:mm'),
        difference: null,
        memory: 'What should I do',
        mood: 'Awful',
        timestamp: 1677165970.045
      }
    ]),
    calendar: useStorage('dayList', [])
  }),
  actions: {
    setTodayMood(date, timestamp, mood, memory) {
      const dataSet = {
        date: dayjs(date).format('YYYY-MM-DD HH:mm'),
        timestamp,
        mood,
        memory
      }
      let uniqueRecordsSet = new Set().add(dataSet)
      const record = [...uniqueRecordsSet.keys()]
      this.totalRecords = [...this.totalRecords, record[0]]
    },
    setCalendar() {
      const recordsWithUniqueTimestamp = countRecordsWithUniqueTimestamp(
        this.totalRecords
      )
      const recordsWithDifference = countRecordsWithDifference(
        recordsWithUniqueTimestamp
      )
      const recordsBeforeToday = countRecordsBeforeToday(recordsWithDifference)
      const todayRecords = countTodayRecords(recordsWithDifference)

      if (todayRecords.length) {
        this.calendar = [
          ...recordsBeforeToday,
          todayRecords[todayRecords.length - 1]
        ]
      } else {
        this.calendar = [...recordsBeforeToday]
      }
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
      this.setCalendar()
    }
  },
  getters: {
    daysWithMoodColor(state) {
      const days = [...state.calendar]
      return days.map((day) => {
        if (day.mood === 'Excellent') {
          day = {
            ...day,
            color: 'purple'
          }
          return day
        }
        if (day.mood === 'Good') {
          day = {
            ...day,
            color: 'green'
          }
          return day
        }
        if (day.mood === 'Awful') {
          day = {
            ...day,
            color: 'red'
          }
          return day
        }
      })
    }
  }
})
