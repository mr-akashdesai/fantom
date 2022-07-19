/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, Nav } from 'rsuite'
import { FaHome, FaRunning } from 'react-icons/fa'
import {BiVideoRecording} from 'react-icons/bi'
import {BsCalculatorFill} from 'react-icons/bs'
import {MdColorLens, MdLocalMovies} from 'react-icons/md'
import {TiWeatherPartlySunny} from 'react-icons/ti'


const logo = require('../../assets/images/logo/fantom-logo-large.svg')

const NavBar = () => {
    const history = useNavigate()
    const [active, setActive] = useState('home')

    const iconSize = '1.5rem'

    const onSelect = (eventKey: string) => {
        setActive(eventKey)
      }

    return (
        <div className='navBar__container'>
        <div className='navBar__bar'>
            <Nav vertical activeKey={active} appearance={'subtle'} onSelect={onSelect}>
                <Nav.Item eventKey="home" onClick={() => history('/homepage')}>
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
                <Nav.Item eventKey="movies" onClick={() => history('/movies')}>
                    <MdLocalMovies size={iconSize} />
                </Nav.Item>
            </Nav>
        </div>
    </div>
    )
FaHome
}

export default NavBar