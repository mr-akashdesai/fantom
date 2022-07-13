import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
  } from 'react-router-dom'
import { CustomProvider , Placeholder } from 'rsuite'
import Container from 'rsuite/Container'
import Header from 'rsuite/Header'
import NavBar from './components/NavBar/NavBar'
import ScreenRecorder from './components/ScreenRecorder/ScreenRecorder'

const App = () => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [loading, setLoading] = useState(true)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        e.matches ? setTheme('dark') : setTheme('light')
     })

    useEffect(() => {
        setLoading(true)
        getTheme()
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
    <Router>
        <Container>
            <Header>
                <NavBar />
            </Header>
            <ScreenRecorder />
        </Container>
    </Router>
    </CustomProvider>
    </>
)}

export default App
