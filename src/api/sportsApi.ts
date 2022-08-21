import axios from 'axios'

export const fetchSportsOnLocation = async (long: string, lat: string) => {
  return await axios.get(
    `${process.env.WEATHER_API_URL}/sports.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}`
  )
}
