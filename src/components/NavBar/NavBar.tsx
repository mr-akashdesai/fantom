import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Divider, Nav } from 'rsuite'
import { FaHome } from 'react-icons/fa'
import {GoDesktopDownload} from 'react-icons/go'
import {GiSpeedometer} from 'react-icons/gi'

const NavBar = () => {
    const history = useNavigate()
    const [active, setActive] = useState('home')

    const iconSize = '1.5rem'

    const onSelect = (eventKey: string) => {
        setActive(eventKey)
      }

//       <div className='navBar__container'>
//       <div className='navBar__bar'>
//       <Nav vertical activeKey={active} appearance={'subtle'} onSelect={onSelect}>
//           <Nav.Item eventKey="home" as={'div'} onClick={() => history('/')}>
//               <FaHome size={iconSize}/>
//           </Nav.Item>
//           <Divider />
//           <Nav.Item eventKey="screen-recorder" onClick={() => history('/screen-recorder')}> 
//               <GoDesktopDownload size={iconSize}/>
//           </Nav.Item>
//           <Nav.Item eventKey="speed-test" onClick={() => history('/speed-test')}>
//               <GiSpeedometer size={iconSize} />
//           </Nav.Item>
//           <Nav.Item eventKey="products">Products</Nav.Item>
//           <Nav.Item eventKey="about">About</Nav.Item>
//       </Nav>
//       </div>
//   </div>
    

    return (
        <div className='navBar__container'>
            <div className='navBar__bar'>
            <Nav vertical activeKey={active} appearance={'subtle'} onSelect={onSelect}>
                <Nav.Item eventKey="home" as={'div'}>
                    <Link to={'/homepage'}>
                        <FaHome size={iconSize}/>
                    </Link>
                </Nav.Item>
                <Divider />
                <Nav.Item eventKey="screen-recorder" as={'div'}> 
                    <Link to={'/screen-recorder'}>
                        <GoDesktopDownload size={iconSize}/>
                    </Link>
                </Nav.Item>
                <Nav.Item eventKey="speed-test" as={'div'}>
                    <Link to={'/speed-test'}>
                        <GiSpeedometer size={iconSize} />
                    </Link>
                </Nav.Item>
                <Nav.Item eventKey="products">Products</Nav.Item>
                <Nav.Item eventKey="about">About</Nav.Item>
            </Nav>
            </div>
        </div>
    )
FaHome
}

export default NavBar