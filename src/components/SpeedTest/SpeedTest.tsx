/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
const { ReactInternetSpeedMeter } = require('react-internet-meter')
const testImage = require('../../assets/images/test-image.jpg')



const SpeedTest = () => {
    const [wifiSpeed, setWifiSpeed] = useState(0)
    return (
        <div className="page-container">
        <h1>Speed Test</h1>
        <ReactInternetSpeedMeter  
            txtSubHeading="Internet is too slow"
            outputType="alert"
            customClassName={null}
            txtMainHeading="Opps..." 
            pingInterval={4000} // milliseconds 
            thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
            threshold={100}
            imageUrl={testImage}
            downloadSize="1781287"  //bytes
            callbackFunctionOnNetworkDown={(wifiSpeed: number)=>console.log(`Internet speed is down ${wifiSpeed}`)}
            callbackFunctionOnNetworkTest={(speed:number)=>setWifiSpeed(speed)}
          />

        </div>
    )
}

export default SpeedTest