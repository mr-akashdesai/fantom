import React, { useState } from 'react'
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi'
import { IoMdSettings } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Button } from 'rsuite'
import Settings from '../Settings/Settings'

const TopBar = () => {
  const [openSettings, setOpenSettings] = useState(false)

  const history = useNavigate()

  return (
    <div className='topBar__container'>
      <span className='topBar__navButtonContainer'>
        <Button appearance='subtle' onClick={() => history(-1)}>
          <HiOutlineArrowSmLeft size={'1.25rem'} />
        </Button>
        <Button appearance='subtle' onClick={() => history(+1)}>
          <HiOutlineArrowSmRight size={'1.25rem'} />
        </Button>
      </span>
      <span className='topBar__settings'>
        <Button appearance='subtle' onClick={() => setOpenSettings(true)}>
          <IoMdSettings size={'1.25rem'} />
        </Button>
      </span>
      {openSettings && <Settings setOpenSettings={setOpenSettings} />}
    </div>
  )
}

export default TopBar
