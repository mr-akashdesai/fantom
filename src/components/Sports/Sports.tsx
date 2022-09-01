import React, { useEffect, useState } from 'react'
import { Loader } from 'rsuite'
import { fetchLocation } from '../../api/locationApi'
import { fetchSportsOnLocation } from '../../api/sportsApi'
import { formattedDistanceToNow } from '../../utils/formattedDistanceToNow'
import Error from '../Error/Error'

enum Sport {
  FOOTBALL = 'football',
  CRICKET = 'cricket',
  GOLF = 'golf'
}

const Sports = () => {
  const [sports, setSports] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  useEffect(() => {
    setLoading(true)
    getLocation().then(() => getSports())
  }, [])

  const getLocation = async () => {
    await fetchLocation()
      .then(res => {
        setLat(res.data.location.lat)
        setLong(res.data.location.lng)
      })
      .catch(err => setError(`ERROR: Could not retrieve location data, ${err.message}`))
      .then(() => setLoading(false))
  }
  const getSports = async () => {
    await fetchSportsOnLocation(long, lat)
      .then(res => setSports(res.data))
      .catch(err => setError(`ERROR: Could not retrieve sports ${err.message}`))
      .then(() => setLoading(false))
  }

  const getIcon = (sport: Sport) => {
    switch (sport) {
      case Sport.FOOTBALL:
        return '⚽️'
      case Sport.CRICKET:
        return '🏏'
      case Sport.GOLF:
        return '⛳️'
      default:
        return '🏅'
    }
  }

  const renderMatches = (sport: Sport) => {
    const sportsArr = sports[sport]

    const matches = sportsArr.length > 0 && (
      <>
        <div className='sports__type'>
          {sport[0].toUpperCase() + sport.slice(1)}&nbsp;{getIcon(sport)}
        </div>
        <div className='sports__matchContainer'>
          {sportsArr.map((game: any, index: number) => {
            let timeString = ''
            new Date() < new Date(game.start)
              ? (timeString = formattedDistanceToNow(new Date(game.start)))
              : (timeString = 'LIVE')
            return (
              <div key={index} className={sportsArr.length === 1 ? 'sports__matchRowBorder' : 'sports__matchRow'}>
                <div className='sports__matchName'>
                  {game.match}
                  <span className={timeString === 'LIVE' ? 'sports__matchTime sports__matchLIVE' : 'sports__matchTime'}>
                    {timeString}
                  </span>
                </div>
                <div className='sports__stadiumName'>{game.stadium} </div>
                <div className='sports__matchTournament'>{game.tournament}</div>
              </div>
            )
          })}
        </div>
      </>
    )

    return matches
  }

  if (loading) return <Loader size={'lg'} backdrop content='loading...' vertical />
  if (error) return <Error message={error} />

  return (
    <>
      {!loading && sports && (
        <div className='page-container'>
          <h3>Sports 🏆</h3>
          <div className='sports__container'>
            {renderMatches(Sport.FOOTBALL)}
            {renderMatches(Sport.CRICKET)}
            {renderMatches(Sport.GOLF)}
          </div>
        </div>
      )}
    </>
  )
}

export default Sports
