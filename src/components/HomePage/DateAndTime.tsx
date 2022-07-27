import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import Clock from 'react-clock'

const DateAndTime = () => {

    const [time, setTime] = useState(new Date())
    

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => {
            clearInterval(interval)
          }
    }, [])


    return (
        <div className="dateAndTime__container">
            <div className="dateAndTime__date">
                {new Date().toDateString()}
            </div>
            <Clock 
                value={time}
                hourMarksWidth={2}
                size={100}    
            />
            <div className="dateAndTime__time">
            {format(time, 'HH:mm:ss OOOO')}
            </div>
        </div>
    )
}

export default DateAndTime