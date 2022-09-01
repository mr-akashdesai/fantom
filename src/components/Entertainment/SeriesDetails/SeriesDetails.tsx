import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader } from 'rsuite'
import { fetchSeriesCast, fetchSeriesDetails, fetchSeriesRecommendations } from '../../../api/entertainmentApi'
import Error from '../../Error/Error'
import CastDetails from '../CastDetails'
import SeriesHero from './SeriesHero'
import SeriesRecommendations from './SeriesRecommendations'

const SeriesDetails = () => {
  const params = useParams()
  const history = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [series, setSeries] = useState(null)
  const [seriesCast, setSeriesCast] = useState(null)
  const [seriesRecommendations, setSeriesRecommendations] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([GetSeriesDetails(), GetSeriesCast(), GetSeriesRecommendations()]).then(() => setLoading(false))
  }, [params.id])

  const GetSeriesDetails = async () => {
    fetchSeriesDetails(params.id)
      .then(res => setSeries(res.data))
      .catch(err => setError(err.message))
  }

  const GetSeriesCast = async () => {
    fetchSeriesCast(params.id)
      .then(res => setSeriesCast(res.data))
      .catch(err => setError(err.message))
  }

  const GetSeriesRecommendations = async () => {
    fetchSeriesRecommendations(params.id)
      .then(res => setSeriesRecommendations(res.data))
      .catch(err => setError(err.message))
  }

  if (error) return <Error message={error} />
  if (loading) {
    return <Loader size={'lg'} backdrop content='loading...' vertical />
  }
  return (
    <>
      {!loading && (
        <div className='page-container'>
          <SeriesHero series={series} />
          <CastDetails cast={seriesCast} />
          <SeriesRecommendations seriesRecommendations={seriesRecommendations} history={history} />
        </div>
      )}
    </>
  )
}

export default SeriesDetails
