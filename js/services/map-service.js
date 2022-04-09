'use strict'

const STORAGE_KEY_LOCS = 'placesDBLocs'

var gLocations = []
var gLastId = 0

function getLocationById(locId) {
  return gLocations.find((loc) => loc.id === locId)
}

function getLocationIdxById(locId) {
  return gLocations.findIndex((loc) => loc.id === locId)
}

function storeLocation(name, lat, lng) {
  gLocations.push({ id: ++gLastId, name, lat, lng })
  _saveToStorage()
}

function removeLocationByIdx(locIdx) {
  gLocations.splice(locIdx, 1)
  _saveToStorage()
}

function getLocationsCSV() {
  let csvStr = 'name, lat, lng\n'
  gLocations.forEach((loc) => (csvStr += `${loc.name},${loc.lat},${loc.lng}\n`))
  return csvStr
}

function getLocations() {
  return gLocations
}

function createLocations() {
  const locs = getFromStorage(STORAGE_KEY_LOCS)
  if (!locs || locs.length === 0) return null

  gLocations = locs
  gLastId = gLocations[gLocations.length - 1].id
  return gLocations
}

function _saveToStorage() {
  saveToStorage(STORAGE_KEY_LOCS, gLocations)
}
