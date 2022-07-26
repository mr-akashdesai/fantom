import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CustomProvider } from 'rsuite'
import Container from 'rsuite/Container'
import Sidebar from 'rsuite/Sidebar'
import ColorPicker from './components/ColorPicker/ColorPicker'
import Dictionary from './components/Dictionary/Dictionary'
import Entertainment from './components/Entertainment/Entertainment'
import MovieDetails from './components/Entertainment/MovieDetails/MovieDetails'
import SeriesDetails from './components/Entertainment/SeriesDetails/SeriesDetails'
import HomePage from './components/HomePage/HomePage'
import NavBar from './components/NavBar/NavBar'
import ScreenRecorder from './components/ScreenRecorder/ScreenRecorder'
import Sports from './components/Sports/Sports'
import MailViewMessage from './components/TempMail/MailViewMessage'
import TempMail from './components/TempMail/TempMail'
import Weather from './components/Weather/Weather'
import paths from './constants/paths'
import { Context, initialContext, useImmerReducer } from './Context/context'
import { Reducer } from './Context/reducer'
import { ITheme } from './types/ITheme'
import { getTheme } from './utils/getTheme'

const App = () => {
  const [state, dispatch] = useImmerReducer(Reducer, initialContext)
  const storedTheme = window.localStorage.getItem('theme') as ITheme

  useEffect(() => {
    window.electron.changeThemeSource(storedTheme ? storedTheme : ITheme.System)
  }, [])

  return (
    <>
      <Context.Provider value={{ state, dispatch }}>
        <CustomProvider theme={getTheme(state.themeSetting)}>
          <Container>
            <Sidebar style={{ display: 'flex', flexDirection: 'column' }}>
              <NavBar />
            </Sidebar>
            <Routes>
              <Route path='/' element={<Navigate replace to={paths.homepage()} />} />
              <Route path={paths.homepage()} element={<HomePage />} />
              <Route path={paths.screenRecorder()} element={<ScreenRecorder />} />
              <Route path={paths.dictionary()} element={<Dictionary />} />
              <Route path={paths.colorPicker()} element={<ColorPicker />} />
              <Route path={paths.weather()} element={<Weather />} />
              <Route path={paths.sports()} element={<Sports />} />
              <Route path={paths.entertainment()} element={<Entertainment />} />
              <Route path='/entertainment/movie-details/:id' element={<MovieDetails />} />
              <Route path='/entertainment/series-details/:id' element={<SeriesDetails />} />
              <Route path={paths.tempMail()} element={<TempMail />} />
              <Route path='/temp-mail/view/:id' element={<MailViewMessage />} />
            </Routes>
          </Container>
        </CustomProvider>
      </Context.Provider>
    </>
  )
}

export default App
