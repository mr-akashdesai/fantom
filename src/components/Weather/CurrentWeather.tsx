import React from 'react'
import { formatRelative } from 'date-fns'

const CurrentWeather = (currentWeather: any) => {
    const weather = currentWeather.currentWeather.current
    const location = currentWeather.currentWeather.location

    const lastUpdated = () =>{
        const str = formatRelative(new Date(weather.last_updated), new Date())
        return str.slice(0, 1).toUpperCase() + str.substring(1)
    }
    return (
        <>
        <div className='currentWeather__container'>
            <div className='currentWeather__location'>{location.name}, {location.country}</div>
            <div className='currentWeather__status'>{weather.condition.text}</div>
            <div className='currentWeather__feelsLikeLabel'>Feels like</div>
            <div className='currentWeather__feelsLike'>{weather.feelslike_c}°</div>
            <div className='currentWeather__lastUpdatedLabel'>Last Updated</div>
            <div className='currentWeather__lastUpdated'>   
                {lastUpdated()}
                </div>
                <div className='currentWeather__tempContainer'>
                <span className='currentWeather__temperature'>{weather.temp_c}°</span>
                <span className='currentWeather__icon'><img src={weather.condition.icon}/></span>
                </div>
            </div>
        </>
    )
}

export default CurrentWeather