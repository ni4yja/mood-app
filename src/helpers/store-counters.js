import { ref } from 'vue'
import dayjs from 'dayjs/esm/index.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)

const today = ref(dayjs())

export default function () {
  const countRecordsWithUniqueTimestamp = (records) => {
    return records.filter((record, index, list) => {
      return (
        index == list.length - 1 ||
        list[index + 1].timestamp !== record.timestamp
      )
    })
  }

  const countRecordsWithDifference = (records) => {
    return records.map((record, index) => {
      return {
        ...record,
        difference:
          index === 0
            ? 0
            : Math.abs(
                dayjs(records[index - 1].date).diff(dayjs(record.date), 'h')
              )
      }
    })
  }

  const countRecordsBeforeToday = (records) => {
    return records.filter((record, index) => {
      if (
        index === 0 ||
        (record.difference > 0 &&
          records[index - 1].date !== record.date &&
          dayjs(record.date).utc().format('YYYY-MM-DD') !==
            dayjs(today.value).utc().format('YYYY-MM-DD'))
      ) {
        return record
      }
    })
  }

  const countTodayRecords = (records) => {
    return records.filter((record) => {
      if (
        dayjs(record.date).utc().format('YYYY-MM-DD') ===
        dayjs(today.value).utc().format('YYYY-MM-DD')
      ) {
        return record
      }
    })
  }

  return {
    countRecordsWithUniqueTimestamp,
    countRecordsWithDifference,
    countRecordsBeforeToday,
    countTodayRecords
  }
}
