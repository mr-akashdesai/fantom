/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Divider, Nav } from 'rsuite'
import { FaHome } from 'react-icons/fa'
import {GoDesktopDownload} from 'react-icons/go'
import {AiFillCalculator} from 'react-icons/ai'
import {MdColorLens} from 'react-icons/md'


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
                    <GoDesktopDownload size={iconSize}/>
                </Nav.Item>
                <Nav.Item eventKey="calculator" onClick={() => history('/calculator')}>
                    <AiFillCalculator size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="color-picker" onClick={() => history('/color-picker')}>
                    <MdColorLens size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="about">About</Nav.Item>
            </Nav>
        </div>
    </div>
    )
FaHome
}

export default NavBar