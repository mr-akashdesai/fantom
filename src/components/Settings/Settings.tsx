import React, { useContext, useEffect, useRef } from 'react'
import { Radio, RadioGroup } from 'rsuite'
import { setThemeSetting } from '../../Context/dispatch'
import { Context } from '../../Context/context'
import { ITheme } from './Types/ITheme'


const Settings = ({setOpenSettings}: any) => {

    const { state, dispatch } = useContext(Context)
    const settingsRef = useRef<any>()

    useEffect(() => {
     const handler = (e: MouseEvent) =>{
            if(settingsRef.current && !settingsRef.current.contains(e.target)){
                setOpenSettings(false)
            }
        }

        document.addEventListener('mousedown', handler)
        return ()=> {
            document.removeEventListener('mousedown', handler)
        }

    })


return (
    <>
    <div ref={settingsRef} className='settings__container'>
        <h6>Theme:</h6>
        <br/>
        <RadioGroup name="radioList" inline appearance="picker" defaultValue={state.themeSetting}>
            <Radio value={ITheme.System} onClick={() => dispatch(setThemeSetting(ITheme.System))}>System</Radio>
            <Radio value={ITheme.Light} onClick={() => dispatch(setThemeSetting(ITheme.Light))}>Light</Radio>
            <Radio value={ITheme.Dark} onClick={() => dispatch(setThemeSetting(ITheme.Dark))}>Dark</Radio>
        </RadioGroup>
    </div>
    </>
)}


export default Settings