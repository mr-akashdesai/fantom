import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentWeather from './CurrentWeather'
import { Loader } from 'rsuite'
import Forecast from './Forecast'

const Weather = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)

    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState(null) 
    
    useEffect(() => {
        setLoading(true)
        getLocation()
        getCurrentWeather()
        getForecast()
    }, [lat, long])

    const getLocation = async () => {
        await axios.post(`${process.env.GOOGLE_GEOLOCATION_URL}/geolocate?key=${process.env.GOOGLE_API_KEY}`)
        .then((res) => {
            setLat(res.data.location.lat)
            setLong(res.data.location.lng)
        })
        .catch((err) => { 
            setError(true)
             console.log('ERROR: Could not retrieve location data' ,err)
        })
    }

    const getCurrentWeather = async () => {

        await axios.get(`${process.env.WEATHER_API_URL}/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}&aqi=no`)
        .then((res) => {
           setCurrentWeather(res.data)
        })
        .catch((err) => { 
            setError(true)
            console.log('ERROR: Could not retrieve current weather', err)
        })
    }

    const getForecast = async () => {
        
        await axios.get(`${process.env.WEATHER_API_URL}/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}&days=10&aqi=no`)
        .then((res) => {
            setForecast(res.data)
        })
        .catch((err) => { 
            setError(true)
            console.log('ERROR: could not retrieve forecast', err)
        })
        .then(() =>{
            setLoading(false)
        })   
    }

    if (error) { return <div>Error</div> }
    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }

    return(
        <div className="page-container">
            <h2>Weather</h2>
            {lat && long &&
            <>
            <CurrentWeather currentWeather={currentWeather}/>
            <Forecast forecast={forecast} />
            </>}
        </div>
    )
}

export default Weather