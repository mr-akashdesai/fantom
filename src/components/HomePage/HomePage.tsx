import React, { useState } from 'react'
import Spline from '@splinetool/react-spline'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'rsuite'
import paths from '../../constants/paths'
import { SplineComponent } from '../../constants/splineComponents'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const history = useNavigate()

  const onMouseDown = (e: any) => {
    switch (e.target.id) {
      case SplineComponent.Weather:
        history(paths.weather())
        break
      case SplineComponent.ColorPicker:
        history(paths.colorPicker())
        break
      case SplineComponent.ScreenRecorder:
        history(paths.screenRecorder())
        break
      case SplineComponent.Dictionary:
        history(paths.dictionary())
        break
      case SplineComponent.Sports:
        history(paths.sports())
        break
      case SplineComponent.Entertainment:
        history(paths.entertainment())
        break
      case SplineComponent.TempMail:
        history(paths.tempMail())
    }
  }

  const onLoad = () => setLoading(false)

  return (
    <>
      {loading && <Loader size={'lg'} backdrop content='loading...' vertical />}
      <div className='homepage__container'>
        <Spline
          scene='https://prod.spline.design/KFdXC4c2wQoe7ldH/scene.splinecode'
          onMouseDown={onMouseDown}
          onLoad={onLoad}
        />
      </div>
    </>
  )
}

export default HomePage
