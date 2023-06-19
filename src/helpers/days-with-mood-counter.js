import dayjs from 'dayjs/esm/index.js'

export default function () {
  const countDaysWithMood = (selectedPeriod, calendarRecords, mood) => {
    let dayList = []
    selectedPeriod.map((dayOfSelectedPeriod) => {
      calendarRecords.forEach((dayRecord) => {
        if (
          dayOfSelectedPeriod.date ===
          dayjs(dayRecord.date).format('YYYY-MM-DD')
        ) {
          dayList.push(dayRecord)
        }
      })
    })
    return dayList.filter((day) => day.mood === mood).length
  }

  return {
    countDaysWithMood
  }
}
