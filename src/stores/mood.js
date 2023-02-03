import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs/esm/index.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)

const today = ref(dayjs())

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
    todayRecord: {},
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

      const recordsBeforeToday = recordsWithDifference.filter(
        (record, index) => {
          if (
            index === 0 ||
            (record.difference > 0 &&
              recordsWithUniqueTimestamp[index - 1].date !== record.date &&
              dayjs(record.date).utc().format('YYYY-MM-DD') !==
                dayjs(today.value).utc().format('YYYY-MM-DD'))
          ) {
            return record
          }
        }
      )

      const todayRecords = recordsWithDifference.filter((record) => {
        if (
          dayjs(record.date).utc().format('YYYY-MM-DD') ===
          dayjs(today.value).utc().format('YYYY-MM-DD')
        ) {
          return record
        }
      })

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
