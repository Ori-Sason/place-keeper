'use strict'

//called from other pages
function setColorsBySettings() {
  createSettings()
  const { bgClr, txtClr } = getSettings()
  changeBgClr(bgClr)
  changeTxtClr(txtClr)
}

function changeBgClr(bgClr) {
  document.body.style.backgroundColor = bgClr
}

function changeTxtClr(txtClr) {
  document.body.style.color = txtClr
}
