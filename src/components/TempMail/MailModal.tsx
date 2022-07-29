import React, { useEffect, useState } from 'react' 
import { FaLock } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { Modal, InputGroup, Whisper, Tooltip, Input, Button, Divider } from 'rsuite'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'

const MailModal = ({mailjs, showLoginModal, setShowLoginModal, history, setCredentials}: any) =>  {
    const [domain, setDomain] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [showLogIn, setShowLogIn] = useState(true)
    const [visiblePW, setVisiblePW] = useState(false)
    const [visibleRepeatPW, setVisibleRepeatPW] = useState(false)

    useEffect(() => {
        mailjs.getDomains()
        .then((res: any) => setDomain(res.data[0].domain))
        .catch(console.error)
    },[])
    
    useEffect(() => {
        setEmail('')
        setPassword('')
        setRepeatPassword('')
    }, [showLogIn])

     const handleLogin = () => {
        mailjs.login(email, password)
        .then(() => setShowLoginModal(false))
        .catch((err: any) => console.log(err))
     }

     const handleRegister = async () => {
        const emailWithDomain = email + '@' + domain 
        await mailjs.register(emailWithDomain, password)
        .then(console.log())
     }

     const handleCreateRandomAccount = async () => {
        Promise.all([        
            await mailjs.createOneAccount()
            .then((res: any) => setCredentials(res.data))])
        .then(() => setShowLoginModal(false))
     }

    const DividerCreateAccount = () => <>
        <Divider>or</Divider>
        <Button onClick={handleCreateRandomAccount}>Generate a random email for me</Button>
        </>

    const EmailAndPassword = () => 
        <div className="tempMail_modalBody">
        <label>Email</label>
        <InputGroup inside>
            <InputGroup.Addon>
            <GrMail />
            </InputGroup.Addon>
            <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
            <Input placeholder={'email'} value={email} onChange={(value) => setEmail(value)}/>
            </Whisper>
            {!showLogIn && <InputGroup.Addon>{`@${domain}`}</InputGroup.Addon>}
        </InputGroup>
        <br />
        <label>Password</label>
        <InputGroup inside>
            <InputGroup.Addon>
            <FaLock />
            </InputGroup.Addon>
            <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
            <Input placeholder={'password'} type={visiblePW ? 'text' : 'password'} value={password} onChange={(value) => setPassword(value)}/>
            </Whisper>
            <InputGroup.Button onClick={() => setVisiblePW(!visiblePW)}>
                {visiblePW ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
        </InputGroup>
        {!showLogIn && <>
        <br />
        <label>Repeat Password</label>
        <InputGroup inside>
            <InputGroup.Addon>
            <FaLock />
            </InputGroup.Addon>
            <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
            <Input placeholder={'password'} type={visibleRepeatPW ? 'text' : 'password'} value={repeatPassword} onChange={(value) => setRepeatPassword(value)}/>
            </Whisper>
            <InputGroup.Button onClick={() => setVisibleRepeatPW(!visibleRepeatPW)}>
                {visibleRepeatPW ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
        </InputGroup>
        </>}
        </div>


     const Login = () => <>
        <Modal.Body>
        {EmailAndPassword()}
        </Modal.Body>
        <Modal.Footer>
        <div className="tempMail__modalFooterContainer">
        <Button disabled={!email || !password} onClick={handleLogin} appearance="primary" color="green">
        Login
        </Button>
        <DividerCreateAccount/>
        </div>
        </Modal.Footer>
    </>

    const Register = () => <> 
        <Modal.Body>
        {EmailAndPassword()}
        </Modal.Body>
        <Modal.Footer>
        <div className="tempMail__modalFooterContainer">
        <Button disabled={!email || !password || password != repeatPassword} onClick={handleRegister} appearance="primary" color="green">
        Register
        </Button>
        <DividerCreateAccount/>
        </div>
        </Modal.Footer>
    </> 
 
      
    return (
        <Modal style={{top: '10%'}} size={'sm'} backdrop={'static'} open={showLoginModal} onClose={() => history(-1)}>
        <Modal.Header closeButton={false}>
        <Modal.Title className="tempMail_modalTitle">
        <a className="tempMail__modalBackBtn" onClick={() => history(-1)}>
        <HiOutlineArrowSmLeft size={'1.25rem'}/>Go Back
        </a>
        <h3>Temp Mail 📩</h3>
        </Modal.Title>
        </Modal.Header>
        <div className="tempMail__modalButtonContainer">
        <Button appearance="subtle" className={showLogIn ? 'tempMail__btnActive' : ''} onClick={() => setShowLogIn(true)}>Login</Button>
        <Button appearance="subtle" className={!showLogIn ? 'tempMail__btnActive' : ''} onClick={() => setShowLogIn(false)}>Register</Button>
        </div>
        {showLogIn && Login()}
        {!showLogIn && Register()}
    </Modal>
    )}

  export default MailModal