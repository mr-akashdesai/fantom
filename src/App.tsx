import React, { useEffect, useState } from 'react'
import {
    Route, 
    Routes,
    useNavigate
  } from 'react-router-dom'
import { CustomProvider , Placeholder } from 'rsuite'
import Container from 'rsuite/Container'
import Sidebar from 'rsuite/Sidebar'
import NavBar from './components/NavBar/NavBar'
import ScreenRecorder from './components/ScreenRecorder/ScreenRecorder'
import HomePage from './components/HomePage/HomePage'
import SpeedTest from './components/SpeedTest/SpeedTest'

const App = () => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [loading, setLoading] = useState(true)
    const history = useNavigate()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        e.matches ? setTheme('dark') : setTheme('light')
     })

    useEffect(() => {
        setLoading(true)
        getTheme()
        history('/')
        setLoading(false)
    }, [])
    
    
    const getTheme = async () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
        
    }

    if (loading) {
        return (
        <Placeholder style={{ marginTop: 30 }} rows={5} graph="image" active />
        )
    }

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
                <Route path="/speed-test" element={<SpeedTest />} />
            </Routes>
        </Container>
    </CustomProvider>
    </>
)}

export default App
