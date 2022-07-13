import React, { useState, useEffect } from 'react'
import { Grid, Row, Col, Container, Modal, Button, Placeholder, List } from 'rsuite'
import PcIcon from '@rsuite/icons/Pc'
import IconButton from 'rsuite/IconButton'
import {ISource} from './types/ISource'
import { maxChars } from '../../utils/maxChars'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoPlaceholder = require('../../assets/images/video-placeholder.png')

const ScreenRecorder = () => {
    const [showModal, hideModal] = useState(false)
    const [sources, setSources] = useState<ISource[]>([])
    const [stream, setStream] = useState(undefined)
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
            if(platform.indexOf('Mac')){
                return defaultConstraints
            }
            if(platform.indexOf('Win') && source.name === 'Entire Screen') {
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
        await mediaDevices.getUserMedia(constraints()).then((stream: MediaStream) => {
            const localVideo = document.getElementById('screenRecorder-preview') as HTMLVideoElement
            if (localVideo) {
              setStream(stream)
              localVideo.srcObject = stream
              localVideo.play()
            }
        })
        handleClose()
    }

    const sourcePreview = (source : ISource) => {
        return (
            <>
            {maxChars(source.name, 50)}
            <img className='screenRecorder__imagePreview' src={source.thumbnail} alt="preview"/>
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
                <List.Item key={index} index={index} className='screenRecorder__imagePreviewContainer' onClick={() => selectSource(source)}>
                    {sourcePreview(source)}
                </List.Item>))}
                </List>
            </Modal.Body>
            <Modal.Footer className='screenRecorder__modalButtonGroup'>
            <Button onClick={handleClose} className='screenRecorder__modalButton' appearance="primary" color='blue'>
                Ok
            </Button>
            <Button onClick={handleClose} className='screenRecorder__modalButton' appearance="default">
                Cancel
            </Button>
            </Modal.Footer>
        </Modal>
        )
    }

    return (
        <div className='screenRecorder__container'>
        <Grid fluid>
            <Row className='show-grid screenRecorder__pickSourceContainer'>
            <IconButton icon={<PcIcon/>} block size={'lg'} onClick={() => getSources()}>Pick Source</IconButton>
            </Row>
            <Row className='show-grid'>
               <div className='screenRecorder__videoContainer'>
                <video poster={videoPlaceholder} className='screenRecorder__videoPlayer' id='screenRecorder-preview'/>
                </div>
            </Row>
            {SourceModal()}
        </Grid>
        </div>
    )
}

export default ScreenRecorder