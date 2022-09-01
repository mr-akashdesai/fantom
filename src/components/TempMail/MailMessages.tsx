import React from 'react'
import { formatDistance } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import paths from '../../constants/paths'

const MailMessages = ({ messages }: any) => {
  const history = useNavigate()
  return (
    <>
      {messages &&
        messages.length > 0 &&
        messages.map((message: any) => (
          <div
            key={message.id}
            className={
              message.seen
                ? 'tempMail__messageContainer tempMail__messageRead'
                : 'tempMail__messageContainer tempMail__messageUnRead'
            }
            onClick={() => history(paths.tempMailViewMessage(message.id))}>
            <div className='tempMail__messageSender'>{message.from.name}</div>
            <div className='tempMail__messageContents'>
              {message.hasAttachments && '📎 '}
              <span className='tempMail__messageSubject'>{message.subject}</span>
              {message.intro && <span className='tempMail__messageBody'>&nbsp;-&nbsp;{message.intro}</span>}
            </div>
            <div className='tempMail__messageDate'>
              {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
            </div>
          </div>
        ))}
    </>
  )
}

export default MailMessages
