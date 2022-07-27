/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Divider, Nav } from 'rsuite'
import { FaHome, FaRunning } from 'react-icons/fa'
import {BiVideoRecording} from 'react-icons/bi'
import {BsCalculatorFill} from 'react-icons/bs'
import {MdColorLens, MdLocalMovies} from 'react-icons/md'
import {TiWeatherPartlySunny} from 'react-icons/ti'
import logo from '../../assets/images/logo/fantom-logo-large.svg'
import TopBar from './TopBar'

const NavBar = () => {
    const history = useNavigate()
    const location = useLocation()
    
    const [active, setActive] = useState('home')
    const iconSize = '1.5rem'

    useEffect(() => {
        setActive(location.pathname.substring(1))
    },[location])

    const onSelect = (eventKey: string) => {
        setActive(eventKey)
      }

    return (
        <>
        <TopBar/>
        <div className='navBar__container'>
        <div className='navBar__bar'>
            <Nav vertical activeKey={active} appearance={'subtle'} onSelect={onSelect}>
                <Nav.Item eventKey="homepage" onClick={() => history('/homepage')}>
                <img className='navBar__logo' src={logo} />
                </Nav.Item>
                <Divider />
                <Nav.Item eventKey="screen-recorder" onClick={() => history('/screen-recorder')}> 
                    <BiVideoRecording size={iconSize}/>
                </Nav.Item>
                <Nav.Item eventKey="calculator" onClick={() => history('/calculator')}>
                    <BsCalculatorFill size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="color-picker" onClick={() => history('/color-picker')}>
                    <MdColorLens size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="weather" onClick={() => history('/weather')}>
                    <TiWeatherPartlySunny size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="sports" onClick={() => history('/sports')}>
                    <FaRunning size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="movies" onClick={() => history('/entertainment')}>
                    <MdLocalMovies size={iconSize} />
                </Nav.Item>
            </Nav>
        </div>
    </div>
    </>
    )
FaHome
}

export default NavBar