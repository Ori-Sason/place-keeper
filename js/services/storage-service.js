'use strict'

function saveToStorage(key, val){
    localStorage.setItem(key, JSON.stringify(val))
}

function getFromStorage(key){
    return JSON.parse(localStorage.getItem(key))
}