import axios from 'axios'

export const geocode = address => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=ip&access_token=pk.eyJ1IjoiamJ1Y2FyaWEiLCJhIjoiY2x2OGY1N2NrMGp0bjJqcHFobmE4M3QzaCJ9.jHh_g9nCSNFZL5lAIUErQA&limit=1`

  return axios
    .get(url)
    .then(response => {
      if (response.data.features.length === 0) {
        throw new Error('Unable to find location')
      }
      const latitude = response.data.features[0].center[1]
      const longitude = response.data.features[0].center[0]
      const placeName = response.data.features[0].place_name
      const location = [`${latitude}, ${longitude}`].toString()

      return location
    })
    .catch(error => {
      throw new Error('Geocode unable to connect')
    })
}

geocode('tampa').then(data => {
  console.log(data)
})
