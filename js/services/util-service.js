'use strict'

function getCSSValues(el, property) {
  return window.getComputedStyle(el).getPropertyValue(property)
}

function rgbToHex(str) {
  function getHex(str) {
    str = (+str).toString(16)
    return str.padStart(2, 0)
  }

  var [r, g, b] = str.match(/(\d+)/g)
  return `#${getHex(r)}${getHex(g)}${getHex(b)}`
}
