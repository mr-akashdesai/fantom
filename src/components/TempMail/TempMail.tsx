import Mailjs from '@cemalgnlts/mailjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MailModal from './MailModal'

const TempMail = () => {

    const mailjs = new Mailjs()
    const history = useNavigate()

    const [credentials, setCredentials] = useState(null)
    const [showLoginModal, setShowLoginModal] = useState(true)

    useEffect(() => {

        // mailjs.register('user@example.com', "password")
        // .then(console.log)

//         mailjs.login("user@example.com", "password")
//   .then(console.log)

        // mailjs.createOneAccount().then((res) => console.log(res) )


        console.log('creds', credentials)
        credentials && mailjs.login(credentials.username, credentials.password)
        .then(console.log)
        .then(() => mailjs.me().then(console.log))
    },[credentials])


    return (
        <div className="page-container">
            {credentials && <div>
                {credentials.username}
                {credentials.password}
                </div>}
            <MailModal 
                mailjs={mailjs}
                showLoginModal={showLoginModal} 
                setShowLoginModal={setShowLoginModal} 
                history={history}  
                setCredentials={setCredentials}
            />
        </div>
    )
}

export default TempMail