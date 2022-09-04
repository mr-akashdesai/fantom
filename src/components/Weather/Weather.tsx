import React, { useEffect, useState } from 'react'
import { Loader } from 'rsuite'
import { fetchLocation } from '../../api/locationApi'
import { fetchCurrentWeatherOnLocation, fetchWeatherForecastOnLocation } from '../../api/weatherApi'
import Error from '../Error/Error'
import CurrentWeather from './CurrentWeather'
import Forecast from './Forecast'
import WeatherSearch from './WeatherSearch'

const Weather = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      .catch(err => setError('ERROR: Could not retrieve location data' + err.message))
  }

  const GetCurrentWeather = async () => {
    fetchCurrentWeatherOnLocation(long, lat)
      .then(res => setCurrentWeather(res.data))
      .catch(err => setError('ERROR: Could not retrieve current weather' + err.message))
  }

  const GetForecast = async () => {
    fetchWeatherForecastOnLocation(long, lat)
      .then(res => setForecast(res.data))
      .catch(err => setError('ERROR: could not retrieve forecast' + err.message))
  }

  const setCoords = (lat: string, long: string) => {
    setLong(long)
    setLat(lat)
  }

  if (error) return <Error message={error} />
  if (loading) return <Loader size={'lg'} backdrop content='loading...' vertical />

  return (
    <>
      {!loading && currentWeather && forecast && (
        <div className='page-container'>
          <div className='weather__header'>
            <h3 className='weather__title'>Weather 🌦</h3>
            <WeatherSearch setError={setError} setCoords={setCoords} />
          </div>
          <CurrentWeather currentWeather={currentWeather} forecastData={forecast} />
          <Forecast forecastData={forecast} />
        </div>
      )}
    </>
  )
}

export default Weather
