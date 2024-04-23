import { getWeather } from './utils/weather.js'
import { geocode } from './utils/geocode.js'

const locationInput = document.getElementById('locationInput')
const weatherInfo = document.getElementById('weatherInfo')
const buttonEl = document.getElementById('submit')

buttonEl.addEventListener('click', () => {
  let address = locationInput.value

  geocode(address)
    .then(data => {
      getWeather(data).then(data => {
        weatherInfo.innerText = data
      })
    })
    .catch(error => {
      console.log('Errors:', error.message)
    })
})
