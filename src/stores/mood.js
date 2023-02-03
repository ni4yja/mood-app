import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs/esm/index.js'
import utc from 'dayjs/plugin/utc.js'
import useCounters from '../helpers/store-counters.js'

dayjs.extend(utc)

const {
  countRecordsWithUniqueTimestamp,
  countRecordsWithDifference,
  countRecordsBeforeToday,
  countTodayRecords
} = useCounters()

export const useCalendarStore = defineStore({
  id: 'main',
  state: () => ({
    currentDay: {},
    totalRecords: useStorage('recordList', [
      {
        date: dayjs('2023-01-31 14:00').utc().format('YYYY-MM-DD HH:mm'),
        timestamp: 1675187861.045,
        difference: null,
        mood: 'Good'
      }
    ]),
    calendar: useStorage('dayList', [])
  }),
  actions: {
    setTodayMood(date, timestamp, mood) {
      const dataSet = {
        date: dayjs(date).utc().format('YYYY-MM-DD HH:mm'),
        timestamp,
        mood
      }
      let uniqueRecordsSet = new Set().add(dataSet)
      const record = [...uniqueRecordsSet.keys()]
      this.totalRecords = [...this.totalRecords, record[0]]

      const recordsWithUniqueTimestamp = countRecordsWithUniqueTimestamp(
        this.totalRecords
      )
      const recordsWithDifference = countRecordsWithDifference(
        recordsWithUniqueTimestamp
      )
      const recordsBeforeToday = countRecordsBeforeToday(recordsWithDifference)
      const todayRecords = countTodayRecords(recordsWithDifference)

      this.calendar = [
        ...recordsBeforeToday,
        todayRecords[todayRecords.length - 1]
      ]
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
