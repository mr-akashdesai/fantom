import React, { useEffect, useState } from 'react'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'
import { BsPersonCircle } from 'react-icons/bs'
import { FiCopy } from 'react-icons/fi'
import { Button, Dropdown, Progress } from 'rsuite'

const MailHeader = ({ setShowLoginModal, credentials, setCredentials, setMessages, storage }: any) => {
  const [visible, setVisible] = useState(false)
  const [password, setPassword] = useState(credentials.password && '*'.repeat(credentials.password.length))
  const storageUsed = Math.round((storage.used / storage.quota) * 100)

  useEffect(() => {
    visible
      ? setPassword(credentials.password)
      : setPassword(credentials.password && '*'.repeat(credentials.password.length))
  }, [visible])

  const renderButton = (props: any, ref: any) => {
    return (
      <Button appearance='subtle' {...props} ref={ref}>
        <BsPersonCircle size={'1.5rem'} />
      </Button>
    )
  }

  const signOut = () => {
    window.localStorage.removeItem('mailToken')
    setCredentials(null)
    setMessages(null)
    setShowLoginModal(true)
  }

  const PasswordPanel = () => (
    <Dropdown.Item panel style={{ padding: 10 }}>
      <div className='tempMail__headerReveal'>
        <p>Password: {password}</p>
        <Button appearance='subtle' onClick={() => setVisible(!visible)}>
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </Button>
      </div>
    </Dropdown.Item>
  )

  return (
    <div className='tempMail__headerContainer'>
      <div className='tempMail__headerTitle'>
        <h3>Inbox</h3>
        <div className='tempMail__headerAddress' onClick={() => navigator.clipboard.writeText(credentials.username)}>
          <p> ({credentials.username} </p>
          <FiCopy size={'0.75rem'} />
          &nbsp;)
        </div>
      </div>
      <Dropdown style={{ justifySelf: 'end' }} placement='bottomEnd' renderToggle={renderButton}>
        <Dropdown.Item panel style={{ padding: 10 }}>
          <p>Signed in as</p>
          <strong>{credentials.username}</strong>
        </Dropdown.Item>
        {credentials.autoGenerated && credentials.password && <PasswordPanel />}
        <Dropdown.Item divider />
        <Dropdown.Item panel style={{ padding: 10 }}>
          <p>Storage</p>
          <div className='tempMail__headerStorage'>
            {`${(storage.used / 1000000).toFixed(1)} / ${Math.round(storage.quota / 1000000)} mb`}
          </div>
          <br />
          <Progress.Line percent={storageUsed} status='active' strokeColor='#464B9F' showInfo={false} />
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item onSelect={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default MailHeader