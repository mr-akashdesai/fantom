import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Loader } from 'rsuite'
import { formattedDistanceToNow } from '../../utils/formattedDistanceToNow'

const Sports = () => {

    const [sports, setSports] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)

    useEffect(() => { 
        getSports()
    },[lat, long])

    const getSports = async () => {
        !long && !lat &&
        axios.post(`${process.env.GOOGLE_GEOLOCATION_URL}/geolocate?key=${process.env.GOOGLE_API_KEY}`)
        .then((res) => {
            setLat(res.data.location.lat)
            setLong(res.data.location.lng)
        })
        .catch((err) => { 
            setError(true)
             console.log('ERROR: Could not retrieve location data' ,err)
        })

        long && lat &&
        await axios.get(`${process.env.WEATHER_API_URL}/sports.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}`)
        .then((res) => setSports(res.data))
        .catch((err) => { 
            setError(true)
            console.log('ERROR: Could not retrieve current weather', err)
        })
        .then(() => setLoading(false))
    }

    const getIcon = (sport: string) => {
        switch(sport) {
            case 'football': return '⚽️'
            case 'cricket': return '🏏'
            case 'golf': return '⛳️'
        }
    }

    const renderMatches = (sport: any) => {
        
        const sportsArr = sports[sport]
    
        return (
            <>
            {sportsArr.length > 0 &&
            <>
            <div className="sports__type">{sport[0].toUpperCase() + sport.slice(1)} {getIcon(sport)}</div>
                <div className="sports__matchContainer">
                {sportsArr.map((game: any) =>{
                    return(
                        <div className={sportsArr.length === 1 ? 'sports__matchRowBorder' : 'sports__matchRow'}>
                            <div className="sports__matchName">
                                {game.match}
                                <span className="sports__matchTime">
                                    {formattedDistanceToNow(new Date(game.start))}
                                </span>
                            </div>
                            <div className="sports__stadiumName">{game.stadium} </div>
                            <div className="sports__matchTournament">{game.tournament}</div>
                        </div>
                    )
                })}
                </div>
            </>}
            </>
        )
    }



    if (error) { return <div>Error</div> }
    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }

    return (
        <>
        {console.log(sports['cricket'])}
        {!loading &&
        <div className="page-container">
            <h2>Sports 🏃🏽‍♀️</h2>
            <div className="sports__container">
            {renderMatches('cricket')}
            {renderMatches('football')}
            {renderMatches('golf')}
            </div>
        </div>}
        </>
    )
}

export default Sports