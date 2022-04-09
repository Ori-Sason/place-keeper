'use strict'

const STORAGE_KEY_SET = 'placesDBSet'
const ORIG_COLORS = {
  bgClr: rgbToHex(getCSSValues(document.body, 'background-color')),
  txtClr: rgbToHex(getCSSValues(document.body, 'color')),
}

let gSettings = {
  email: '',
  age: 25,
  gender: 'male',
  bgClr: ORIG_COLORS.bgClr,
  txtClr: ORIG_COLORS.txtClr,
  bDay: new Date().toJSON().substring(0, 10),
  bTime: new Date().toTimeString().substring(0, 5),
}

function createSettings() {
  const settings = getFromStorage(STORAGE_KEY_SET)
  if (settings) gSettings = settings
  return gSettings
}

function getSettings() {
  return gSettings
}

function getOriginalColor (clrKey){
  return ORIG_COLORS[clrKey]
}

function saveSettings(email, age, gender, bgClr, txtClr, bDay, bTime) {
  gSettings = { email, age, gender, bgClr, txtClr, bDay, bTime }
  _saveToStorage()
}

function _saveToStorage() {
  saveToStorage(STORAGE_KEY_SET, gSettings)
}
