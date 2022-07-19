import axios from 'axios'
import React, { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { InputGroup, Input } from 'rsuite'

type SearchProps = {
    setCoords : any
}

const WeatherSearch = ({setCoords} : SearchProps) => {

    const [searchText, setSearchText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(true)


    const Suggestions = () => {
        return (
        <div className="weather__suggestionContainer">
            { suggestions.map((suggestion: any)  => 
            <div onClick={() => {
                setCoords(suggestion.lat, suggestion.lon)
                setShowSuggestions(false)
                setSearchText('')
                }} 
            key={suggestion.id}
            className='weather__suggestionItem'>{suggestion.name}, {suggestion.country}</div>)}
        </div>
        )
    }
    
    
    const onInputChange = async (value: string) => {
        setShowSuggestions(true)
        setSearchText(value)

        value.length >= 3 && await axios.get(`${process.env.WEATHER_API_URL}/search.json?key=${process.env.WEATHER_API_KEY}&q=${value}`)
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.log(err))
    }

    return (
        <>
        <InputGroup inside size={'md'} className="weather__search" >
        <Input value={searchText} onChange={(value) => onInputChange(value) } />
            <InputGroup.Button disabled>
                <GoSearch />
            </InputGroup.Button>
        </InputGroup>
        {Object.keys(suggestions).length > 0 && showSuggestions && Suggestions()}
        </>
    )
}

export default WeatherSearch
