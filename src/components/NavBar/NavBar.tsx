/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import { BsCameraReels, BsBook, BsCloudSun, BsDropletHalf } from 'react-icons/bs'
import { GiTrophyCup, GiPopcorn } from 'react-icons/gi'
import { GoMail } from 'react-icons/go'
import { useLocation, useNavigate } from 'react-router-dom'
import { Divider, Nav } from 'rsuite'
import logo from '../../assets/images/logo/fantom-logo-large.svg'
import paths from '../../constants/paths'
import TopBar from './TopBar'

const NavBar = () => {
  const history = useNavigate()
  const location = useLocation()

  const [active, setActive] = useState('homepage')
  const iconSize = '1.5rem'

  useEffect(() => {
    setActive(location.pathname.substring(1))
  }, [location])

  const onSelect = (eventKey: string) => {
    setActive(eventKey)
  }

  return (
    <>
      <TopBar />
      <div className='navBar__container'>
        <div className='navBar__bar'>
          <Nav vertical activeKey={active} appearance={'subtle'} onSelect={onSelect}>
            <Nav.Item title='Home' eventKey='homepage' onClick={() => history(paths.homepage())}>
              <img className='navBar__logo' src={logo} />
            </Nav.Item>
            <Divider />
            <Nav.Item
              title='Screen Recorder'
              eventKey='screen-recorder'
              onClick={() => history(paths.screenRecorder())}>
              <BsCameraReels size={iconSize} />
            </Nav.Item>
            <Nav.Item title='Dictionary' eventKey='dictionary' onClick={() => history(paths.dictionary())}>
              <BsBook size={iconSize} />
            </Nav.Item>
            <Nav.Item title='Color Picker' eventKey='color-picker' onClick={() => history(paths.colorPicker())}>
              <BsDropletHalf size={iconSize} />
            </Nav.Item>
            <Nav.Item title='Weather' eventKey='weather' onClick={() => history(paths.weather())}>
              <BsCloudSun size={iconSize} />
            </Nav.Item>
            <Nav.Item title='Temp Mail' eventKey='temp-mail' onClick={() => history(paths.tempMail())}>
              <GoMail size={iconSize} />
            </Nav.Item>
            <Nav.Item title='Sports' eventKey='sports' onClick={() => history(paths.sports())}>
              <GiTrophyCup size={iconSize} />
            </Nav.Item>
            <Nav.Item title='Entertainment' eventKey='entertainment' onClick={() => history(paths.entertainment())}>
              <GiPopcorn size={iconSize} />
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  )
}

export default NavBar
