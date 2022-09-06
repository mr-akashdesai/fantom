import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Button } from 'rsuite'

const Forecast = (forecastData: any) => {
  const data = forecastData.forecastData.forecast
  const location = forecastData.forecastData.location
  const dateHour = new Date(location.localtime).getHours()

  useEffect(() => {
    setTimeout(() => scrollIntoCorrectHour(), 50)
  }, [location])

  const scrollIntoCorrectHour = () => {
    const element = document.getElementById(`hour-${dateHour}`)
    element.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }

  const checkCurrentHour = (value: any) => {
    if (dateHour === new Date(value).getHours()) {
      return <b>Now</b>
    } else {
      return format(new Date(value), 'HH')
    }
  }

  const todayHourlyForecast = () => (
    <>
      <Button appearance={'subtle'} onClick={() => (document.getElementById('hourContainer').scrollLeft -= 150)}>
        <MdOutlineKeyboardArrowLeft size={'2rem'} />
      </Button>
      <div id='hourContainer' className='forecast__hourContainer'>
        {data &&
          data.forecastday[0].hour.map((value: any, index: number) => {
            return (
              <div id={`hour-${index}`} key={index} className='forecast__hourlyForecast'>
                <div>{checkCurrentHour(value.time)}</div>
                <img src={`http://${value.condition.icon}`} />
                <div>{Math.round(value.temp_c)}°</div>
              </div>
            )
          })}
      </div>
      <Button appearance={'subtle'} onClick={() => (document.getElementById('hourContainer').scrollLeft += 150)}>
        <MdOutlineKeyboardArrowRight size={'2rem'} />
      </Button>
    </>
  )

  return <div className='forecast__container'>{todayHourlyForecast()}</div>
}

export default Forecast
