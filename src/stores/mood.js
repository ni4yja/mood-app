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
        memory: 'I am tired, ahahah',
        mood: 'Good',
        timestamp: 1675187861.045
      }
    ]),
    calendar: useStorage('dayList', []),
    memoryCards: useStorage('cardList', [])
  }),
  actions: {
    setTodayMood(date, timestamp, mood) {
      const dataSet = {
        date: dayjs(date).format('YYYY-MM-DD HH:mm'),
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
    },
    setTodayMemory(todayRecord, note) {
      this.memoryCards = [
        this.calendar.map((record) => {
          if (record.date === todayRecord.date) {
            record = {
              ...record,
              memory: note
            }
            return record
          }
          return record
        })
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
