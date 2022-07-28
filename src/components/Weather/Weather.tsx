import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentWeather from './CurrentWeather'
import { Loader } from 'rsuite'
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
        getData()
    },[lat, long])


    const getData = async () => {
        !long && !lat &&
        axios.post(`${process.env.GOOGLE_GEOLOCATION_URL}/geolocate?key=${process.env.GOOGLE_API_KEY}`)
        .then((res) => {
            setLat(res.data.location.lat)
            setLong(res.data.location.lng)
        })
        .catch((err) => { 
            setError(true)
             console.log('ERROR: Could not retrieve location data' ,err)
        })

        long && lat &&
        await axios.get(`${process.env.WEATHER_API_URL}/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}&aqi=no`)
        .then((res) => setCurrentWeather(res.data))
        .catch((err) => { 
            setError(true)
            console.log('ERROR: Could not retrieve current weather', err)
        })

        long && lat &&
        await axios.get(`${process.env.WEATHER_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}&days=10&aqi=no`)
        .then((res) => setForecast(res.data))
        .catch((err) => { 
            setError(true)
            console.log('ERROR: could not retrieve forecast', err)
            setLoading(false)
        })
        .then(() => setLoading(false))

    }


    const setCoords = (lat : string, long: string) => {
        setLong(long)
        setLat(lat)
    }


    if (error) { return <div>Error</div> }
    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }

    return(
        <>
        {!loading &&
        <div className="page-container">
            <div className="weather__header">
            <h3 className="weather__title">Weather 🌦</h3>
            <WeatherSearch setCoords={setCoords} />
            </div>    
            <CurrentWeather currentWeather={currentWeather} forecastData={forecast}/>
            <Forecast forecastData={forecast} />
        </div>}
        </>
    )
    
}

export default Weather