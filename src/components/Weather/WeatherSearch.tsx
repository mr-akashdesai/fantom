import React, { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { InputGroup, Input } from 'rsuite'
import { fetchLocationOnSearch } from '../../api/locationApi'

const WeatherSearch = ({ setCoords, setError }: any) => {
  const [searchText, setSearchText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(true)

  const Suggestions = () => {
    return (
      <div className='weather__suggestionContainer'>
        {suggestions.map((suggestion: any) => (
          <div
            onClick={() => {
              setCoords(suggestion.lat, suggestion.lon)
              setShowSuggestions(false)
              setSearchText('')
            }}
            key={suggestion.id}
            className='weather__suggestionItem'>
            {suggestion.name}, {suggestion.country}
          </div>
        ))}
      </div>
    )
  }

  const onInputChange = async (value: string) => {
    setShowSuggestions(true)
    setSearchText(value)

    value.length >= 3 &&
      fetchLocationOnSearch(value)
        .then(res => setSuggestions(res.data))
        .catch(err => setError(err.message))
  }

  return (
    <>
      <InputGroup inside size={'md'} className='weather__search'>
        <Input placeholder='Search city...' value={searchText} onChange={value => onInputChange(value)} />
        <InputGroup.Button disabled>
          <GoSearch />
        </InputGroup.Button>
      </InputGroup>
      {Object.keys(suggestions).length > 0 && showSuggestions && Suggestions()}
    </>
  )
}

export default WeatherSearch
