import React, { useEffect, useState } from 'react'
import { InputGroup, Input, Loader } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search'
import axios from 'axios'
import { toggleOverflowWrapper } from '../../utils/toggleOverflowWrapper'
import { GiSpeaker } from 'react-icons/gi'

const Dictionary = () => {

    const [searchWord, setSearchWord] = useState('')
    const [definition, setDefinition] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    let audio: HTMLAudioElement

    useEffect(() => {
        audio = document.getElementById('dictionary__wordPronounciation') as HTMLAudioElement
        audio && audio.load()
    },[definition])

    const onEnter= (event: any) => {
        if (event.keyCode == 13){
            document.getElementById('search').click()
        }
    }



    const getDefintion = async () => {
        setLoading(true)
        await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
        .then((res) => {setDefinition(res.data[0]), setError(null)})
        .catch((err) => setError(err.response.data))
        .then(() => setLoading(false))
    }

    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }
 
    return (
        <>
        {!loading &&
        <div className='page-container'>
            <div className={definition || error ? ' dictionary__header' : 'dictionary__header dictionary__center'}>
            <h3>Dictionary 📚</h3>
            <br />
            <InputGroup inside>
                <Input placeholder="Enter word...." value={searchWord}
                    onKeyDown={(e) => onEnter(e)} 
                    onChange={(value) => setSearchWord(value)} />
                <InputGroup.Button id={'search'} onClick={() => getDefintion()}>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
            </div>
            {error &&
                <div className='dictionary__definitionContainer dictionary__error'>
                    <h4>{error.title}</h4>
                    <p>{error.message}</p>
                </div>}
            {definition && !error &&
            <div className='dictionary__container'>
                <div className='dictionary__word'>
                    {definition.word}
                    <span className='dictionary__speaker' 
                        onClick={() => !!audio && audio.play()}>
                    <GiSpeaker/>
                    </span>
                    {definition.phonetics.length > 0 && definition.phonetics.some((p:any) => p.audio !== '') &&
                    <audio id='dictionary__wordPronounciation'>
                        <source src={definition.phonetics.find((p:any) => p.audio !== '').audio}/>
                    </audio>}
                </div>
                {definition.meanings.map((meaning: any, index: number) => 
                <div key={index} className='dictionary__definitionContainer'>
                    <div><i>{meaning.partOfSpeech}</i></div>
                    <br />
                    <div id={index.toString()}className='dictionary__definitionWrapper'>
                    {meaning.definitions.map((obj: any, index: number) => 
                        <div key={index} className='dictionary__definitionItem'>
                            <div className='dictionary__definitionIndex'>{index+1}</div>{obj.definition}
                        </div>)}
                    </div>
                    {meaning.definitions.length > 1 && <a id={`toggle-${index}`} onClick={() => toggleOverflowWrapper(index.toString(), `toggle-${index}`, '2rem', 'See more...', 'See less...')}>See more...</a>}
                    {meaning.synonyms.length > 0 && <div className="dictionary__synonyms">
                    <b>Synonyms</b>
                    <div>{meaning.synonyms.join(', ')}</div>
                    </div>}
                </div>)}
            </div>}
        </div>}
        </>
    )
}

export default Dictionary