import React, { useEffect, useState } from 'react'
import { Loader } from 'rsuite'
import { fetchLocation } from '../../api/locationApi'
import { fetchCurrentWeatherOnLocation, fetchWeatherForecastOnLocation } from '../../api/weatherApi'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import WeatherSearch from './WeatherSearch'

const Weather = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  useEffect(() => {
    setLoading(true)
    long && lat && Promise.all([GetCurrentWeather(), GetForecast()]).then(() => setLoading(false))
    !long && !lat && SetLocationData()
  }, [lat, long])

  const SetLocationData = async () => {
    fetchLocation()
      .then(res => {
        setLat(res.data.location.lat)
        setLong(res.data.location.lng)
      })
      .catch(err => {
        setError(true)
        console.log('ERROR: Could not retrieve location data', err)
      })
  }

  const GetCurrentWeather = async () => {
    fetchCurrentWeatherOnLocation(long, lat)
      .then(res => setCurrentWeather(res.data))
      .catch(err => {
        setError(true)
        console.log('ERROR: Could not retrieve current weather', err)
      })
  }

  const GetForecast = async () => {
    fetchWeatherForecastOnLocation(long, lat)
      .then(res => setForecast(res.data))
      .catch(err => {
        setError(true)
        console.log('ERROR: could not retrieve forecast', err)
      })
  }

  const setCoords = (lat: string, long: string) => {
    setLong(long)
    setLat(lat)
  }

  if (error) return <div>Error</div>

  if (loading) return <Loader size={'lg'} backdrop content='loading...' vertical />

  return (
    <>
      {!loading && currentWeather && forecast && (
        <div className='page-container'>
          <div className='weather__header'>
            <h3 className='weather__title'>Weather 🌦</h3>
            <WeatherSearch setCoords={setCoords} />
          </div>
          <CurrentWeather currentWeather={currentWeather} forecastData={forecast} />
          <Forecast forecastData={forecast} />
        </div>
      )}
    </>
  )
}

export default Weather
