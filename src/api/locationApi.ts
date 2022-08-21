import axios from 'axios'

export const fetchLocation = () => {
  return axios.post(`${process.env.GOOGLE_GEOLOCATION_URL}/geolocate?key=${process.env.GOOGLE_API_KEY}`)
}

export const fetchLocationOnSearch = async (searchTerm: string) => {
  return await axios.get(
    `${process.env.WEATHER_API_URL}/search.json?key=${process.env.WEATHER_API_KEY}&q=${searchTerm}`
  )
}
