'use strict'

const gMarkers = []
let gMap
let gSelectedPos = null

function onInit() {
  setColorsBySettings()
  const locs = createLocations()
  if (!locs) return

  locs.forEach((loc) => createMarker(loc))
  renderLocations()
}

function initMap() {
  // The location of Eilat
  const eilat = { lat: 29.5575, lng: 34.952 }

  // The map, centered at Eilat
  const options = {
    zoom: 7,
    fullscreenControl: false,
    gestureHandling: 'cooperative', //ctrl+scroll to zoom in
    disableDoubleClickZoom: true,
    center: eilat,
  }

  gMap = new google.maps.Map(document.querySelector('.map'), options)

  //double-click event
  //https://developers.google.com/maps/documentation/javascript/events
  gMap.addListener('dblclick', (ev) => {
    gSelectedPos = ev.latLng
    openNewLocationModal()
  })
}

function onUserLocation() {
  //https://developers.google.com/maps/documentation/javascript/geolocation
  const infoWindow = new google.maps.InfoWindow()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        infoWindow.setPosition(pos)
        infoWindow.setContent('You are here!')
        infoWindow.open(gMap)
        gMap.setCenter(pos)
      },
      () => {
        handleLocationError(true, infoWindow, gMap.getCenter())
      }
    )
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //   infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  )
  infoWindow.open(map)
}

function openNewLocationModal() {
  document.body.classList.add('open-modal')
}

function closeNewLocationModal() {
  document.body.classList.remove('open-modal')
  document.querySelector('.map-form input[type="text"]').value = ''
  gSelectedPos = null
}

function onAddNewLocation(ev) {
  ev.preventDefault()
  const name = ev.target[0].value.trim()
  if (!name) return closeNewLocationModal()

  goToLocation(gSelectedPos)
  storeLocation(name, gSelectedPos.lat(), gSelectedPos.lng())
  createMarker(gSelectedPos)
  renderLocations()
  closeNewLocationModal()
}

function createMarker(pos) {
  const marker = new google.maps.Marker({
    position: pos,
    map: gMap,
  })
  gMarkers.push(marker)
  return marker
}

function onGoToLocation(locIdx) {
  const loc = getLocationById(locIdx)
  goToLocation({ lat: loc.lat, lng: loc.lng })
  if (gMap.getZoom() < 11) gMap.setZoom(11)
}

function goToLocation(pos) {
  gMap.panTo(pos)
}

function renderLocations() {
  const locs = getLocations()
  var strHtml = ''
  locs.map((loc) => {
    strHtml += getLocationHtml(loc)
  })

  document.querySelector('.saved-locations ul').innerHTML = strHtml
}

function getLocationHtml(loc) {
  return `
    <li class="flex justify-between align-center" onclick="onGoToLocation(${loc.id})">🎯 ${loc.name}
    <button onclick="onDelLocation(event, ${loc.id})">&#10006</button></li>`
}

function onDelLocation(ev, locId) {
  ev.stopPropagation()

  const locIdx = getLocationIdxById(+locId)
  if (locIdx === -1) return
  removeMarkerByIdx(locIdx)
  removeLocationByIdx(locIdx)
  renderLocations()
}

function removeMarkerByIdx(markerIdx) {
  const marker = gMarkers[markerIdx]
  marker.setMap(null)
  gMarkers.splice(markerIdx, 1)
}

function onDownloadCSV(elLink) {
  const csvContent = getLocationsCSV()
  elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}
