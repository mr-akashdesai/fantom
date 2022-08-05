/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { loginWithToken } from '../../utils/mailLoginWithToken'
import Mailjs from '@cemalgnlts/mailjs'
import { getMailAttachment } from '../../utils/getMailAttachment'
import { Letter } from 'react-letter'
import { extract } from 'letterparser'
import { Button, Divider, Modal } from 'rsuite'
import { formatDistance } from 'date-fns'
import { BsDownload, BsPrinter } from 'react-icons/bs'
import { GiTrashCan } from 'react-icons/gi'
import RemindIcon from '@rsuite/icons/legacy/Remind'

type AttachmentProps = {
  filename: string
  src: string
}

interface Attachment {
  id: string
  filename: string
  contentType: string
  disposition: string
  transferEncoding: string
  related: boolean
  size: number
  downloadUrl: string
}

const MailViewMessage = () => {
  const history = useNavigate()
  const params = useParams()
  const mailjs = new Mailjs()
  const token = window.localStorage.getItem('token')

  const [loading, setLoading] = useState(true)
  const [openDeletionModal, setOpenDeletionModal] = useState(false)

  const [message, setMessage] = useState(null)
  const [attachments, setAttachments] = useState([])
  const [html, setHtml] = useState(null)
  const [text, setText] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([loginWithToken(token, mailjs)]).then(() => {
      Promise.all([
        mailjs.getMessage(params.id).then(res => {
          setMessage(res.data)
          if (!res.data.seen) {
            mailjs.setMessageSeen(params.id, true)
          }
          if (res.data.hasAttachments) {
            res.data.attachments.forEach((attachment, id) => {
              getMailAttachment(token, attachment.downloadUrl).then((res: any) =>
                MapAttachmentItem(id, res, attachment)
              )
            })
          }
        }),
        mailjs.getSource(params.id).then(source => {
          const { html, text } = extract(source.data.data)
          setHtml(html)
          setText(text)
        })
      ]).then(() => setLoading(false))
    })
  }, [])

  const MapAttachmentItem = (id: number, res: any, attachment: Attachment) => {
    const attachmentEncoded = Buffer.from(res.data, 'binary').toString(attachment.transferEncoding as BufferEncoding)
    const src = `data:${attachment.contentType};${attachment.transferEncoding},${attachmentEncoded}`
    setAttachments(prevState => [...prevState, <AttachmentItem key={id} filename={attachment.filename} src={src} />])
  }

  const AttachmentItem = ({ filename, src }: AttachmentProps) => (
    <div className='tempMail__attachmentContainer'>
      <img width='200' src={src} />
      <div className='tempMail__attachmentDownloadContainer'>
        <span className='tempMail__attachmentDownload'>
          <a href={src} download={filename}>
            <BsDownload />
          </a>
        </span>
        <span className='tempMail__attachmentFileName'>&nbsp;{filename}</span>
      </div>
    </div>
  )

  const SenderDetails = () => (
    <div className='tempMail__messageSenderContainer'>
      <span className='tempMail__messageSenderName'>{message.from.name} </span>
      <span className='tempMail__messageSenderDate'>
        {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
      </span>
      <div className='tempMail__messageSenderAddress'>{message.from.address}</div>
    </div>
  )

  const DeletionModal = () => {
    return (
      <Modal
        backdrop='static'
        role='alertdialog'
        open={openDeletionModal}
        onClose={() => setOpenDeletionModal(false)}
        size='xs'>
        <Modal.Body>
          <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
          &nbsp;Are you sure you want to delete this message?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteMessage} appearance='primary'>
            Yes
          </Button>
          <Button onClick={() => setOpenDeletionModal(false)} appearance='subtle'>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handleDeleteMessage = () => {
    Promise.all([loginWithToken(token, mailjs)]).then(() => {
      mailjs.deleteMessage(params.id).then(() => {
        setOpenDeletionModal(false)
        history(-1)
      })
    })
  }

  const MailViewControls = () => (
    <span className='tempMail__mailViewControls'>
      <Button style={{ marginTop: '5%' }} appearance='subtle' onClick={() => window.print()}>
        <BsPrinter size={'1.5rem'} />
      </Button>
      <Button appearance='subtle' onClick={() => setOpenDeletionModal(true)}>
        <GiTrashCan size={'2rem'} />
      </Button>
    </span>
  )

  return (
    <>
      {!loading && message && (
        <div className='page-container'>
          <div className='tempMail__messageHeader'>
            <h3>{message.subject}</h3>
            <MailViewControls />
          </div>
          <Divider />
          <SenderDetails />
          {html ? <Letter html={html} text={text} /> : <div className='tempMail__messageBody'>{message.text}</div>}
          {message.text && message.hasAttachments && <Divider />}
          {message.hasAttachments && (
            <>
              <h5>Attachments 📎</h5>
              <div className='tempMail__attachments'>{attachments}</div>
            </>
          )}
        </div>
      )}
      <DeletionModal />
    </>
  )
}

export default MailViewMessage
