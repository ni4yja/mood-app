import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs/esm/index.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)

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

      const recordsWithUniqueTimestamp = this.totalRecords.filter(
        (record, index, list) => {
          return (
            index == list.length - 1 ||
            list[index + 1].timestamp !== record.timestamp
          )
        }
      )

      const recordsWithDifference = recordsWithUniqueTimestamp.map(
        (record, index) => {
          return {
            ...record,
            difference:
              index === 0
                ? 0
                : Math.abs(
                    dayjs(recordsWithUniqueTimestamp[index - 1].date).diff(
                      dayjs(record.date),
                      'h'
                    )
                  )
          }
        }
      )

      const recordsPerDay = recordsWithDifference.filter((record, index) => {
        if (
          index === 0 ||
          (record.difference > 0 &&
            recordsWithUniqueTimestamp[index - 1].date !== record.date)
        ) {
          return record
        }
      })

      this.calendar = recordsPerDay
    }
  },
  getters: {
    daysWithMoodColor(state) {
      const days = [...state.totalRecords]
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
