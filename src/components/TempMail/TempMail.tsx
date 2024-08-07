import React, { useEffect, useState } from 'react'
import Mailjs from '@cemalgnlts/mailjs'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'rsuite'
import { ICredentials } from '../../types/TempMail/ICredentials'
import { IStorage } from '../../types/TempMail/IStorage'
import Error from '../Error/Error'
import MailHeader from './MailHeader'
import MailMessages from './MailMessages'
import MailModal from './MailModal'

const TempMail = () => {
  const mailjs = new Mailjs()
  const history = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>(null)
  const [credentials, setCredentials] = useState<ICredentials>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [messages, setMessages] = useState(null)
  const [storage, setStorage] = useState<IStorage>(null)

  useEffect(() => {
    shouldPromptLogin()
  }, [])

  useEffect(() => {
    loginWithUpdatedCredentials()
  }, [credentials])

  const loginWithUpdatedCredentials = () => {
    if (credentials && credentials.password) {
      setLoading(true)
      mailjs
        .login(credentials.username, credentials.password)
        .then(res => {
          window.localStorage.setItem('mailToken', res.data.token)
          Promise.all([
            mailjs.me().then(res => setStorage({ quota: res.data.quota, used: res.data.used })),
            mailjs.getMessages().then(res => setMessages(res.data))
          ])
        })
        .catch(err => setError(err.message))
        .then(() => setLoading(false))
    }
  }

  const shouldPromptLogin = () => {
    const token = window.localStorage.getItem('mailToken')

    if (token) {
      setShowLoginModal(false)
      mailjs
        .loginWithToken(token)
        .then(res => {
          setStorage({ quota: res.data.quota, used: res.data.used })
          setCredentials({ username: mailjs.address, autoGenerated: false })
          mailjs.getMessages().then(res => setMessages(res.data ? res.data : []))
        })
        .catch(err => {
          setError(err.message)
          window.localStorage.removeItem('mailToken')
        })
        .then(() => setLoading(false))
    } else {
      setLoading(false)
      setShowLoginModal(true)
    }
  }

  if (loading) return <Loader size={'lg'} backdrop content='loading...' vertical />
  if (error) return <Error message={error} />

  return (
    <div className='page-container'>
      {!loading && credentials && storage && messages && (
        <>
          <h3>Temp Mail 📨</h3>
          <div className='tempMail__container'>
            <MailHeader
              credentials={credentials}
              setShowLoginModal={setShowLoginModal}
              setCredentials={setCredentials}
              setMessages={setMessages}
              storage={storage}
            />
            <MailMessages messages={messages} />
          </div>
        </>
      )}
      {showLoginModal && (
        <MailModal
          mailjs={mailjs}
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          history={history}
          setCredentials={setCredentials}
        />
      )}
    </div>
  )
}

export default TempMail
