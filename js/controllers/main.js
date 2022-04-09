'use strict'

function onInit() {
  setColorsBySettings()

  const { email, bDay, bTime } = createSettings()
  //if there is no email saved on storage, we have empty string
  //unlike that, bDay and bTime get the current dateTime values
  if (!email) return

  document.querySelector('p').innerText = getHoursUntilBDayStr(bDay, bTime)
}

function getHoursUntilBDayStr(date, time) {
  const bDateTime = `${date}  ${time}`

  const now = new Date()
  let nextBDay = bDateTime.replace(/\d{4}/, now.getFullYear())

  if (Date.parse(nextBDay) < now) {
    nextBDay = bDateTime.replace(/\d{4}/, now.getFullYear() + 1)
  }

  const hoursUntilBDay = (Date.parse(nextBDay) - now) / 1000 / 60 / 60
  const hours = Math.trunc(hoursUntilBDay)
  const minutes = Math.trunc((hoursUntilBDay % 1) * 60)

  return `By the way,
    There are ${hours.toLocaleString()} hours and ${minutes} minutes until your next birthday 🥳`
}
