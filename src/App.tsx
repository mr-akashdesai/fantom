import React, { useEffect, useState } from 'react'
import {
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
import Movies from './components/Movies/Movies'
import MovieDetails from './components/Movies/MovieDetails/MovieDetails'

const App = () => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [loading, setLoading] = useState(true)
    const history = useNavigate()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        e.matches ? setTheme('dark') : setTheme('light')
     })

    useEffect(() => {
        getTheme()
        history('/homepage')
        setLoading(false)
    }, [])
    
    
    const getTheme = async () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
        
    }

    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }

    return(
    <>
    <CustomProvider theme={theme}>
        <Container>
            <Sidebar style={{ display: 'flex', flexDirection: 'column' }}> 
                <NavBar />
            </Sidebar>
            <Routes>
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/screen-recorder" element={<ScreenRecorder/>} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/color-picker" element={<ColorPicker />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie-details/:id" element={<MovieDetails />} />
            </Routes>
        </Container>
    </CustomProvider>
    </>
)}

export default App
