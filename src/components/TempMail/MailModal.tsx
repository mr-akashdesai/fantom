import React, { useEffect, useState } from 'react'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'
import { BiErrorCircle } from 'react-icons/bi'
import { FaLock } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { Modal, InputGroup, Whisper, Tooltip, Input, Button, Divider, Loader } from 'rsuite'

const MailModal = ({ mailjs, showLoginModal, setShowLoginModal, history, setCredentials }: any) => {
  const [loading, setLoading] = useState(null)
  const [domain, setDomain] = useState(null)
  const [registrationError, setRegistrationError] = useState(null)
  const [loginError, setLoginError] = useState(false)

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)

  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)

  const [visiblePW, setVisiblePW] = useState(false)
  const [visibleRepeatPW, setVisibleRepeatPW] = useState(false)

  const [showLogIn, setShowLogIn] = useState(true)

  useEffect(() => {
    mailjs
      .getDomains()
      .then((res: any) => setDomain(res.data[0].domain))
      .catch(console.error)
  }, [])

  useEffect(() => {
    setEmail('')
    setPassword('')
    setRepeatPassword('')
    setEmailError('')
    setPasswordError('')
    setVisiblePW(false)
    setVisibleRepeatPW(false)
  }, [showLogIn])

  useEffect(() => {
    setLoginError(null)
    setRegistrationError(null)
  }, [email, password, repeatPassword])

  const handleLogin = async () => {
    setLoading(true)
    const login = new Promise<void>((resolve, reject) => {
      mailjs.login(email, password).then((res: any) => {
        res.data.id && res.data.token ? resolve() : reject(res)
      })
    })

    await login
      .then(() => {
        setCredentials({ username: email, password: password, autoGenerated: false })
        setPassword('')
        setShowLoginModal(false)
      })
      .catch(err => setLoginError(err.message))
      .then(() => setLoading(false))
  }

  const handleRegister = async () => {
    setLoading(true)
    const emailWithDomain = email + '@' + domain

    const register = new Promise<void>((resolve, reject) => {
      mailjs.register(emailWithDomain, password).then((res: any) => {
        res.data.id ? resolve() : reject(res.data)
      })
    })

    await register
      .then(() => {
        setCredentials({ username: emailWithDomain, password: password, autoGenerated: false })
        setPassword('')
        setRepeatPassword('')
        setShowLoginModal(false)
      })
      .catch(err => setRegistrationError(JSON.parse(err).detail))
      .then(() => setLoading(false))
  }

  const handleCreateRandomAccount = async () => {
    setLoading(true)

    await mailjs
      .createOneAccount()
      .then((res: any) =>
        setCredentials({ username: res.data.username, password: res.data.password, autoGenerated: true })
      )
      .then(() => {
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setShowLoginModal(false)
      })
      .catch((err: Error) => console.log(err.message))
      .then(() => setLoading(false))
  }

  const DividerCreateAccount = () => (
    <>
      <Divider>or</Divider>
      <Button onClick={handleCreateRandomAccount}>Generate a random email for me</Button>
    </>
  )

  const handleEmailChange = (email: string) => {
    const emailString = showLogIn ? String(email) : String(email + '@' + domain)

    setEmail(email)

    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (emailString.match(mailformat)) {
      setEmailError(null)
    } else {
      setEmailError('Please enter a valid email address')
    }
  }

  const handleRepeatPassword = (pw: string) => {
    setRepeatPassword(pw)

    if (password === pw) {
      setPasswordError(null)
    } else {
      setPasswordError('Passwords do not match')
    }
  }

  const EmailAndPassword = () => (
    <div className='tempMail_modalBody'>
      <label>Email</label>
      <InputGroup inside>
        <InputGroup.Addon>
          <GrMail />
        </InputGroup.Addon>
        <Whisper trigger='focus' speaker={<Tooltip>Required</Tooltip>}>
          <Input placeholder={'email'} value={email} onChange={value => handleEmailChange(value)} />
        </Whisper>
        {!showLogIn && <InputGroup.Addon>{`@${domain}`}</InputGroup.Addon>}
      </InputGroup>
      {email.length > 1 && emailError && (
        <div className='tempMail__errorMessage'>
          <BiErrorCircle />
          {emailError}
        </div>
      )}
      <br />
      <label>Password</label>
      <InputGroup inside>
        <InputGroup.Addon>
          <FaLock />
        </InputGroup.Addon>
        <Whisper trigger='focus' speaker={<Tooltip>Required</Tooltip>}>
          <Input
            placeholder={'password'}
            type={visiblePW ? 'text' : 'password'}
            value={password}
            onChange={value => setPassword(value)}
          />
        </Whisper>
        <InputGroup.Button onClick={() => setVisiblePW(!visiblePW)}>
          {visiblePW ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>
      </InputGroup>
      {!showLogIn && (
        <>
          <br />
          <label>Repeat Password</label>
          <InputGroup inside>
            <InputGroup.Addon>
              <FaLock />
            </InputGroup.Addon>
            <Whisper trigger='focus' speaker={<Tooltip>Required</Tooltip>}>
              <Input
                placeholder={'password'}
                type={visibleRepeatPW ? 'text' : 'password'}
                value={repeatPassword}
                onChange={value => handleRepeatPassword(value)}
              />
            </Whisper>
            <InputGroup.Button onClick={() => setVisibleRepeatPW(!visibleRepeatPW)}>
              {visibleRepeatPW ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
          {password.length > 1 && repeatPassword.length > 1 && passwordError && (
            <div className='tempMail__errorMessage'>
              <BiErrorCircle />
              {passwordError}
            </div>
          )}
        </>
      )}
    </div>
  )

  const Login = () => (
    <>
      <Modal.Body>{EmailAndPassword()}</Modal.Body>
      <Modal.Footer>
        <div className='tempMail__modalFooterContainer'>
          {loginError && (
            <div className='tempMail__errorMessage tempMail__loginError'>
              <BiErrorCircle />
              {loginError}
            </div>
          )}
          <Button
            disabled={!email || !password || emailError != null}
            onClick={handleLogin}
            appearance='primary'
            color='green'>
            Login
          </Button>
          <DividerCreateAccount />
        </div>
      </Modal.Footer>
    </>
  )

  const Register = () => (
    <>
      <Modal.Body>{EmailAndPassword()}</Modal.Body>
      <Modal.Footer>
        <div className='tempMail__modalFooterContainer'>
          {registrationError && (
            <div className='tempMail__errorMessage tempMail__loginError'>
              <BiErrorCircle />
              {registrationError}
            </div>
          )}
          <Button
            disabled={!email || !password || emailError != null || passwordError != null}
            onClick={handleRegister}
            appearance='primary'
            color='green'>
            Register
          </Button>
          <DividerCreateAccount />
        </div>
      </Modal.Footer>
    </>
  )

  if (loading) return <Loader size={'lg'} backdrop content='loading...' vertical />

  return (
    <Modal style={{ top: '5%' }} size={'sm'} backdrop={'static'} open={showLoginModal} onClose={() => history(-1)}>
      <Modal.Header closeButton={false}>
        <Modal.Title className='tempMail_modalTitle'>
          <a className='tempMail__modalBackBtn' onClick={() => history(-1)}>
            <HiOutlineArrowSmLeft size={'1.25rem'} />
            Go Back
          </a>
          <div>
            <h3>Temp Mail 📩</h3>
            <p>Powered by: mail.tm</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <div className='tempMail__modalButtonContainer'>
        <Button
          appearance='subtle'
          className={showLogIn ? 'tempMail__btnActive' : ''}
          onClick={() => setShowLogIn(true)}>
          Login
        </Button>
        <Button
          appearance='subtle'
          className={!showLogIn ? 'tempMail__btnActive' : ''}
          onClick={() => setShowLogIn(false)}>
          Register
        </Button>
      </div>
      {showLogIn && Login()}
      {!showLogIn && Register()}
    </Modal>
  )
}

export default MailModal
