const locationInput = document.getElementById('locationInput')
const weatherInfo = document.getElementById('weatherInfo')

document.getElementById('submit').addEventListener('click', () => {
  const location = locationInput.value
  const encodedString = encodeURIComponent(location)

  axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedString}.json?proximity=ip&access_token=pk.eyJ1IjoiamJ1Y2FyaWEiLCJhIjoiY2x2OGY1N2NrMGp0bjJqcHFobmE4M3QzaCJ9.jHh_g9nCSNFZL5lAIUErQA&limit=1`)
    .then(response => {
      const apiResponse = response.data
      const latitude = apiResponse.features[0].center[1]
      const longitude = apiResponse.features[0].center[0]

      console.log(latitude, longitude)

      const params = {
        access_key: 'f4d4cd63ee90a5440e491fef5f10fd11',
        query: `${latitude},${longitude}`,
        units: 'f',
      }
      return axios.get('http://api.weatherstack.com/current', { params })
    })
    .then(response => {
      const apiResponse = response.data
      weatherInfo.innerText = `Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}ºF and wind speed is ${apiResponse.current.wind_speed}mph`
    })
    .catch(error => {
      console.log('Can not connect to weather app')
    })
})
