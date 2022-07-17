import { format } from 'date-fns'
import React, { useEffect } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Button } from 'rsuite'

const Forecast = (forecastData: any) => {

    const data = forecastData.forecast

    useEffect(() => {
        scrollIntoCorrectHour()
    }, [])

    const scrollIntoCorrectHour = () => {
        const dateHour = new Date().getHours()
        const element = document.getElementById(`hour-${dateHour}`)
        element.scrollIntoView({ behavior: 'smooth' , inline: 'center'})
    }

    const todayHourlyForecast = () => 
    <>
        <Button appearance={'subtle'} onClick={() =>  document.getElementById('hourContainer').scrollLeft -= 100}>
            <MdOutlineKeyboardArrowLeft size={'2rem'} />
        </Button>
            <div id='hourContainer' className="forecast__hourContainer">
            {data.forecast.forecastday[0].hour.map((value: any, index: any) => {
                return (
                    <div id={`hour-${index}`} key={index} className="forecast__hourlyForecast">
                    <div>{format(new Date(value.time), 'HH')}</div>
                    <img src={value.condition.icon} />
                    <div>{Math.round(value.temp_c)}°</div>
                    </div>
                )
            })}
        </div>
        <Button appearance={'subtle'} onClick={() =>  document.getElementById('hourContainer').scrollLeft += 100}>
            <MdOutlineKeyboardArrowRight size={'2rem'}/>
        </Button>
    </>

    return (
        <>
        <div className="forecast__container">
            {todayHourlyForecast()}
        </div>
        </>
    )
}

export default Forecast