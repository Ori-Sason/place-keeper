'use strict'

function onInit() {
  setSettingsUI(createSettings())
}

function setSettingsUI({ email, age, gender, bgClr, txtClr, bDay, bTime }) {
  document.getElementById('form-email').value = email

  document.getElementById('form-age').value = age
  onInputAgeChange(age)

  document.getElementById('form-gender').value = gender

  document.getElementById('form-bg-clr').value = bgClr
  changeBgClr(bgClr)

  document.getElementById('form-txt-clr').value = txtClr
  changeTxtClr(txtClr)

  document.getElementById('form-bday').value = bDay

  document.getElementById('form-btime').value = bTime
}

function onInputAgeChange(age) {
  document.querySelector('.form-age-span').innerText = age
}

function onLastSavedClr(elId, clrKey) {
  const settings = getSettings()
  const clr = settings[clrKey]
  changeColor(elId, clrKey, clr)
}

function onDefaultClr(elId, clrKey) {
  const clr = getOriginalColor(clrKey)
  changeColor(elId, clrKey, clr)
}

function changeColor(elId, clrKey, clr) {
  document.getElementById(`form-${elId}`).value = clr

  //execute function by her name string
  const camel = clrKey.charAt(0).toUpperCase() + clrKey.substring(1)
  window[`change${camel}`](clr)
}

function onSaveSettings(ev) {
  ev.preventDefault()
  const settings = []
  for (let i = 0; i < ev.target.length; i++) {
    const el = ev.target[i]
    if (el.type === 'button' || el.type === 'submit') continue
    settings.push(el.value)
  }
  saveSettings(...settings)

  const elNotice = document.querySelector('.submit-notice')
  elNotice.style.opacity = 1
  setTimeout(() => (elNotice.style.opacity = 0), 3000)
}
