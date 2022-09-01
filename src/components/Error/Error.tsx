import React from 'react'
import { MdReportGmailerrorred } from 'react-icons/md'
import { Button } from 'rsuite'

const Error = ({ message }: any) => (
  <div className='page-container'>
    <h1>
      <MdReportGmailerrorred />
      <br />
      Oops, something went wrong
    </h1>
    <h3>{message}</h3>
    <Button size='lg' style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
      Retry
    </Button>
  </div>
)

export default Error
