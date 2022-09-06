import React, { useState } from 'react'
import PcIcon from '@rsuite/icons/Pc'
import { Grid, Row, Modal, Button, List } from 'rsuite'
import IconButton from 'rsuite/IconButton'
import videoPlaceholder from '../../assets/images/video-placeholder.png'
import { ISource } from '../../types/ScreenRecorder/ISource'
import { maxChars } from '../../utils/maxChars'

const ScreenRecorder = () => {
  const [showModal, hideModal] = useState(false)
  const [sources, setSources] = useState<ISource[]>([])
  let [mediaRecorder, setMediaRecorder] = useState(null)
  const [eventBtn, setEventBtn] = useState('Start')
  const [disableStart, setDisableStart] = useState(true)
  const [disableStop, setDisableStop] = useState(true)

  const recordedChunks: any[] = []

  const handleOpen = () => hideModal(true)
  const handleClose = () => hideModal(false)

  const getSources = async () => {
    const inputSources = await window.electron.getSources()
    setSources(inputSources)
    handleOpen()
  }

  const selectSource = async (source: ISource) => {
    const defaultConstraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    }

    const constraints = () => {
      const platform = navigator?.userAgentData?.platform || navigator?.platform
      if (platform.indexOf('Mac')) {
        return defaultConstraints
      }
      if (platform.indexOf('Win') && source.name === 'Entire Screen') {
        return {
          audio: {
            mandatory: {
              chromeMediaSource: 'desktop'
            }
          },
          video: {
            mandatory: {
              chromeMediaSource: 'desktop'
            }
          }
        }
      } else {
        return defaultConstraints
      }
    }

    const mediaDevices = navigator.mediaDevices as any
    const stream = await mediaDevices.getUserMedia(constraints())
    const localVideo = document.getElementById('screenRecorder-preview') as HTMLVideoElement

    if (localVideo) {
      localVideo.srcObject = stream
      localVideo.play()
    }

    const options = { mimeType: 'video/webm; codecs=vp9' }
    mediaRecorder = new MediaRecorder(stream, options)
    mediaRecorder.ondataavailable = handleDataAvailable
    mediaRecorder.onstop = handleStop
    setMediaRecorder(mediaRecorder)
    setDisableStart(false)
    handleClose()
  }

  const sourcePreview = (source: ISource) => {
    return (
      <>
        {maxChars(source.name, 50)}
        <img className='screenRecorder__imagePreview' src={source.thumbnail} alt='preview' />
      </>
    )
  }

  const SourceModal = () => {
    return (
      <Modal backdrop={true} keyboard={false} open={showModal} size={'md'} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Sources</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <List bordered>
            {sources.map((source, index) => (
              <List.Item
                key={index}
                index={index}
                className='screenRecorder__imagePreviewContainer'
                onClick={() => selectSource(source)}>
                {sourcePreview(source)}
              </List.Item>
            ))}
          </List>
        </Modal.Body>
        <Modal.Footer className='screenRecorder__modalButtonGroup'>
          <Button onClick={handleClose} className='screenRecorder__button' appearance='primary' color='blue'>
            Ok
          </Button>
          <Button onClick={handleClose} className='screenRecorder__button' appearance='default'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const startRecording = () => {
    mediaRecorder.start()
    setDisableStart(true)
    setDisableStop(false)
    setEventBtn('Recording')
    console.log('Recording Started 📹')
  }

  const stopRecording = () => mediaRecorder.stop()

  const handleDataAvailable = (e: any) => recordedChunks.push(e.data)

  const handleStop = async (e: any) => {
    setDisableStop(true)
    setEventBtn('Start')

    const blob = new Blob(recordedChunks, {
      type: 'video/webm; codecs=vp9'
    })

    const buffer = Buffer.from(await blob.arrayBuffer())

    await window.electron
      .saveRecording({
        title: 'Save Recording',
        buttonLabel: 'Save video',
        defaultPath: `screen-recording-${new Date().toJSON()}.webm`,
        buffer: buffer
      })
      .then((res: any) => res && console.log('Recording Saved! 🎉'))
      .catch((err: Error) => console.log('Error: ' + err.message))
    setDisableStart(false)
  }

  return (
    <div className='screenRecorder__container page-container'>
      <h3>Screen Recorder 🎥</h3>
      <Grid fluid>
        <Row className='show-grid screenRecorder__pickSourceContainer'>
          <IconButton icon={<PcIcon />} block size={'lg'} onClick={() => getSources()}>
            Pick Source
          </IconButton>
        </Row>
        <Row className='show-grid'>
          <div className='screenRecorder__videoContainer'>
            <video poster={videoPlaceholder} className='screenRecorder__videoPlayer' id='screenRecorder-preview' />
          </div>
        </Row>
        <Row className='show-grid'>
          <div className='screenRecorder__recordingControls'>
            <Button
              onClick={startRecording}
              className='screenRecorder__button screenRecorder__startBtn'
              appearance='primary'
              color={eventBtn === 'Start' ? 'green' : eventBtn === 'Recording' ? 'red' : null}
              disabled={disableStart}>
              {eventBtn}
            </Button>
            <Button
              onClick={stopRecording}
              className='screenRecorder__button'
              appearance='default'
              color='orange'
              disabled={disableStop}>
              Stop
            </Button>
          </div>
        </Row>
        {SourceModal()}
      </Grid>
    </div>
  )
}

export default ScreenRecorder
