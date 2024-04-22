import axios from 'axios'
import queryString from 'query-string'

const locationInput = document.getElementById('locationInput')
const weatherInfo = document.getElementById('weatherInfo')
const buttonEl = document.getElementById('submit')

buttonEl.addEventListener('click', () => {
  const getTimelineURL = 'https://api.tomorrow.io/v4/timelines'
  const apikey = 'eJly8pd7iRjR0Qks5O9pgQ1bwEw0ymXp'
  const locale = locationInput.value
  const encodedString = encodeURIComponent(locale)
  let location = []

  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedString}.json?proximity=ip&access_token=pk.eyJ1IjoiamJ1Y2FyaWEiLCJhIjoiY2x2OGY1N2NrMGp0bjJqcHFobmE4M3QzaCJ9.jHh_g9nCSNFZL5lAIUErQA&limit=1`).then(response => {
    const apiResponse = response.data
    const latitude = apiResponse.features[0].center[1]
    const longitude = apiResponse.features[0].center[0]

    location = [`${longitude}, ${latitude}`].toString()

    const fields = ['precipitationIntensity', 'precipitationType', 'windSpeed', 'windGust', 'windDirection', 'temperature', 'temperatureApparent', 'cloudCover', 'cloudBase', 'cloudCeiling', 'weatherCode']

    const units = 'imperial'

    const now = new Date()

    const timezone = 'America/New_York'

    const getTimelineParameters = queryString.stringify(
      {
        apikey,
        location,
        fields,
        now,
        units,
        timezone,
      },
      { arrayFormat: 'comma' }
    )
    return axios
      .get(getTimelineURL + '?' + getTimelineParameters)
      .then(response => {
        const timelines = response.data.data.timelines
        const firstTimeline = timelines[0]
        const firstInterval = firstTimeline.intervals[0]
        const temperature = firstInterval.values.temperature
        const wind = firstInterval.values.windSpeed
        weatherInfo.innerText = `Tempature in ${locale} is ${temperature}°F and Wind Speed is ${wind}mph`
      })
      .catch(error => {
        console.log('Error', error)
      })
  })
})
