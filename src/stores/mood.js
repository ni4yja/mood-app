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
