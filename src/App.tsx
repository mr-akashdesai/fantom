import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CustomProvider, Loader } from 'rsuite'
import Container from 'rsuite/Container'
import Sidebar from 'rsuite/Sidebar'
import NavBar from './components/NavBar/NavBar'
import ScreenRecorder from './components/ScreenRecorder/ScreenRecorder'
import HomePage from './components/HomePage/HomePage'
import ColorPicker from './components/ColorPicker/ColorPicker'
import Weather from './components/Weather/Weather'
import Sports from './components/Sports/Sports'
import Entertainment from './components/Entertainment/Entertainment'
import MovieDetails from './components/Entertainment/MovieDetails/MovieDetails'
import SeriesDetails from './components/Entertainment/SeriesDetails/SeriesDetails'
import { getTheme } from './utils/getTheme'
import { initialContext, useImmerReducer, Context } from './Context/context'
import { Reducer } from './Context/reducer'
import { ITheme } from './components/Settings/Types/ITheme'
import Dictionary from './components/Dictionary/Dictionary'
import TempMail from './components/TempMail/TempMail'
import MailViewMessage from './components/TempMail/MailViewMessage'

const App = () => {
  const [state, dispatch] = useImmerReducer(Reducer, initialContext)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTheme(getTheme())
    setLoading(false)
  }, [])

  useEffect(() => {
    switch (state.themeSetting) {
      case ITheme.System:
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', e => {
            e.matches ? setTheme('dark') : setTheme('light')
          })
        break
      case ITheme.Light:
        setTheme('light')
        break
      case ITheme.Dark:
        setTheme('dark')
        break
    }
  }, [state.themeSetting])

  if (loading) {
    return <Loader size={'lg'} backdrop content='loading...' vertical />
  }

  return (
    <>
      <Context.Provider value={{ state, dispatch }}>
        <CustomProvider theme={theme}>
          <Container>
            <Sidebar style={{ display: 'flex', flexDirection: 'column' }}>
              <NavBar />
            </Sidebar>
            <Routes>
              <Route path='/' element={<Navigate replace to='/homepage' />} />
              <Route path='/homepage' element={<HomePage />} />
              <Route path='/screen-recorder' element={<ScreenRecorder />} />
              <Route path='/dictionary' element={<Dictionary />} />
              <Route path='/color-picker' element={<ColorPicker />} />
              <Route path='/weather' element={<Weather />} />
              <Route path='/sports' element={<Sports />} />
              <Route path='/entertainment' element={<Entertainment />} />
              <Route
                path='/entertainment/movie-details/:id'
                element={<MovieDetails />}
              />
              <Route
                path='/entertainment/series-details/:id'
                element={<SeriesDetails />}
              />
              "
              <Route path='/temp-mail' element={<TempMail />} />
              <Route path='/temp-mail/view/:id' element={<MailViewMessage />} />
            </Routes>
          </Container>
        </CustomProvider>
      </Context.Provider>
    </>
  )
}

export default App
