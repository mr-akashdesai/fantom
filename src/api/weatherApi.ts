import axios from 'axios'

export const fetchCurrentWeatherOnLocation = async (long: string, lat: string) => {
  return await axios.get(
    `${process.env.WEATHER_API_URL}/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}&aqi=no`
  )
}

export const fetchWeatherForecastOnLocation = async (long: string, lat: string) => {
  return await axios.get(
    `${process.env.WEATHER_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}&days=10&aqi=no`
  )
}
