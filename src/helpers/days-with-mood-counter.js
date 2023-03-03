import dayjs from 'dayjs/esm/index.js'

export default function () {
  const countDaysWithMood = (selectedWeek, calendarRecords, mood) => {
    let dayList = []
    selectedWeek.map((dayOfSelectedWeek) => {
      calendarRecords.forEach((dayRecord) => {
        if (
          dayOfSelectedWeek.date === dayjs(dayRecord.date).format('YYYY-MM-DD')
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
