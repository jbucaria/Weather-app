import axios from 'axios'
import queryString from 'query-string'

export const getWeather = address => {
  const getTimelineURL = 'https://api.tomorrow.io/v4/timelines'
  const apikey = 'eJly8pd7iRjR0Qks5O9pgQ1bwEw0ymXp'
  const fields = ['precipitationIntensity', 'precipitationType', 'windSpeed', 'windGust', 'windDirection', 'temperature', 'temperatureApparent', 'cloudCover', 'cloudBase', 'cloudCeiling', 'weatherCode']

  const units = 'imperial'
  const now = new Date()
  const location = address
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
  let url = getTimelineURL + '?' + getTimelineParameters

  return axios
    .get(url)
    .then(response => {
      const timelines = response.data.data.timelines
      const firstTimeline = timelines[0]
      const firstInterval = firstTimeline.intervals[0]
      const temperature = firstInterval.values.temperature
      const wind = firstInterval.values.windSpeed
      const results = `Tempature in ${location} is ${temperature}°F and Wind Speed is ${wind}mph`
      return results
    })
    .catch(error => {
      throw new Error('Get weather unable to connect')
    })
}
