import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { InputGroup, Input, Modal } from 'rsuite'
import noPicFound from '../../assets/images/no-image.jpeg'
import { DebounceInput } from 'react-debounce-input'

const SearchModal = ({open, handleClose, suggestions, history, value, ...inputProps}: any) =>       
<Modal size={'full'} backdrop={true} keyboard={false} open={open} onClose={handleClose}>
    <Modal.Header closeButton>
    <br />
    <br />
    <InputGroup inside size={'md'} className="movie__searchModal" >
            <DebounceInput
                value={value}
                minLength={3}
                placeholder='Search movie or series...' 
                debounceTimeout={500}
                {...inputProps}/>
        <InputGroup.Button disabled>
            <GoSearch />
        </InputGroup.Button>
    </InputGroup>
</Modal.Header>
<Modal.Body>
    {Object.keys(suggestions).length > 0 && 
    <div className="movie__suggestionContainer">
        {suggestions.filter((suggestion: any) => suggestion.media_type != 'person').map((suggestion: any, index: number) => {
            switch(suggestion.media_type) {
            case 'movie': return (
            <div key={index} className="movie__suggestionItem" onClick={() => history(`movie-details/${suggestion.id}`)}>
            <img className="movie__suggestionItemImage" 
                src={`${process.env.MOVIE_DB_IMAGE_SMALL_URL}${suggestion.poster_path}`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src=noPicFound
                }}/>
                {suggestion.title}&nbsp;{suggestion.release_date && format(new Date(suggestion.release_date), '(yyyy)')}
            </div>)
            case 'tv': return (
            <div key={index} className="movie__suggestionItem"onClick={() => history(`series-details/${suggestion.id}`)}>
                <img className="movie__suggestionItemImage" 
                src={`${process.env.MOVIE_DB_IMAGE_SMALL_URL}${suggestion.poster_path}`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src=noPicFound
                }}/>
                {suggestion.name}&nbsp;{suggestion.first_air_date && format(new Date(suggestion.first_air_date), '(yyyy)')}
            </div>)
            }
        })}
    </div>}
</Modal.Body>
</Modal>

const MultiSearch = () => {
    const [openModal, setOpenModal] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const history = useNavigate()
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    useEffect(() => {
        SetSuggestions()
    }, [searchText])


    const SetSuggestions = async () => {
        searchText.length >= 3 && 
        await axios.get(`${process.env.MOVIE_DB_URL}/search/multi?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`)
        .then((res) => setSuggestions(res.data.results))
        .catch((err) => console.log(err))
    }

    const onInputChange = async (value: string) => setSearchText(value)
    


    return (
        <>
        <InputGroup inside size={'md'} className="movie__search" onClick={() => handleOpen()}>
            <Input disabled placeholder='Search movie or series...' />
                <InputGroup.Button disabled>
                    <GoSearch />
                </InputGroup.Button>
            </InputGroup>
        <SearchModal open={openModal} handleClose={handleClose} onChange={(e: any) => onInputChange(e.target.value)} suggestions={suggestions} value={searchText} history={history}/>
        </>
    )
 }

export default MultiSearch