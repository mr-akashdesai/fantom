import React, { useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Loader } from 'rsuite'
import { useNavigate } from 'react-router-dom'

enum Component {
  Weather = '932e56b4-64ce-4c7d-899e-ae8de5be6782',
  ColorPicker = 'c8c36808-1591-40e5-b1e5-4675fc07ed6e',
  ScreenRecorder = '99a26076-b354-41af-a56b-a74b085a32e0',
  Dictionary = '79fecb2e-13fd-4182-a4bc-289eea97e7e9',
  Entertainment = 'd5c79833-0caa-4d13-bfb3-eae0aa85da26',
  Sports = '621bdcec-6fcd-40e0-9239-c7c57f7e0165',
  TempMail = '140c342b-698c-4f8c-8f94-09af166da1a8'
}

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const history = useNavigate()

  const onMouseDown = (e: any) => {
    switch (e.target.id) {
      case Component.Weather:
        history('/weather')
        break
      case Component.ColorPicker:
        history('/color-picker')
        break
      case Component.ScreenRecorder:
        history('/screen-recorder')
        break
      case Component.Dictionary:
        history('/dictionary')
        break
      case Component.Sports:
        history('/sports')
        break
      case Component.Entertainment:
        history('/entertainment')
        break
      case Component.TempMail:
        history('/temp-mail')
    }
  }

  const onLoad = () => setLoading(false)

  return (
    <>
      {loading && <Loader size={'lg'} backdrop content='loading...' vertical />}
      <div className='homepage__container'>
        <Spline
          scene='https://prod.spline.design/4WBy1xcLZjy5bWq6/scene.splinecode'
          onMouseDown={onMouseDown}
          onLoad={onLoad}
        />
      </div>
    </>
  )
}

export default HomePage
