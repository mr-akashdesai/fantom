import React, { useEffect, useState } from 'react'
import {
    Navigate,
    Route, 
    Routes,
    useNavigate
  } from 'react-router-dom'
import { CustomProvider , Loader } from 'rsuite'
import Container from 'rsuite/Container'
import Sidebar from 'rsuite/Sidebar'
import NavBar from './components/NavBar/NavBar'
import ScreenRecorder from './components/ScreenRecorder/ScreenRecorder'
import HomePage from './components/HomePage/HomePage'
import Calculator from './components/Calculator/Calculator'
import ColorPicker from './components/ColorPicker/ColorPicker'
import Weather from './components/Weather/Weather'
import Sports from './components/Sports/Sports'
import Entertainment from './components/Entertainment/Entertainment'
import MovieDetails from './components/Entertainment/MovieDetails/MovieDetails'
import SeriesDetails from './components/Entertainment/SeriesDetails/SeriesDetails'
import { getTheme } from './utils/getTheme'
import { Theme } from './components/Settings/Types/Theme'

const App = () => {

    const [themeSetting, setThemeSetting] = useState<Theme>(Theme.System)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [loading, setLoading] = useState(true)

    themeSetting === Theme.Dark &&
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        e.matches ? setTheme('dark') : setTheme('light')
     })

    useEffect(() => {
        setTheme(getTheme())
        setLoading(false)
    }, [])

    
    
    

    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }

    return(
    <>
    <CustomProvider theme={theme}>
        <Container>

            <Sidebar style={{ display: 'flex', flexDirection: 'column' }}> 
                <NavBar  />
            </Sidebar>
            <Routes>
                <Route path="/" element={<Navigate replace to="/homepage" />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/screen-recorder" element={<ScreenRecorder/>} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/color-picker" element={<ColorPicker />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/entertainment" element={<Entertainment />} />
                <Route path="/movie-details/:id" element={<MovieDetails />} />
                <Route path="/series-details/:id" element={<SeriesDetails />} />"
            </Routes>
        </Container>
    </CustomProvider>
    </>
)}

export default App
