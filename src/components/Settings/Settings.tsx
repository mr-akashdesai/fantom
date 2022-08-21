import React, { useEffect, useRef } from 'react'
import ThemeSelector from './ThemeSelector'

const Settings = ({ setOpenSettings }: any) => {
  const settingsRef = useRef<any>()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setOpenSettings(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div ref={settingsRef} className='settings__container'>
      <ThemeSelector />
    </div>
  )
}

export default Settings
