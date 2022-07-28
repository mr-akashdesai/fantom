/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Divider, Nav } from 'rsuite'
import {GiTrophyCup, GiPopcorn} from 'react-icons/gi'
import {BsCameraReels, BsBook, BsCloudSun, BsDropletHalf} from 'react-icons/bs'
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
                    <BsCameraReels size={iconSize}/>
                </Nav.Item>
                <Nav.Item eventKey="dictionary" onClick={() => history('/dictionary')}> 
                    <BsBook size={iconSize}/>
                </Nav.Item>
                <Nav.Item eventKey="color-picker" onClick={() => history('/color-picker')}>
                    <BsDropletHalf size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="weather" onClick={() => history('/weather')}>
                    <BsCloudSun size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="sports" onClick={() => history('/sports')}>
                    <GiTrophyCup size={iconSize} />
                </Nav.Item>
                <Nav.Item eventKey="movies" onClick={() => history('/entertainment')}>
                    <GiPopcorn size={iconSize} />
                </Nav.Item>
            </Nav>
        </div>
    </div>
    </>
    )
}

export default NavBar