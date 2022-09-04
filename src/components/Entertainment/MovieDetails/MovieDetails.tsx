import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from 'rsuite'
import { fetchMovieCast, fetchMovieDetails, fetchMovieRecommndations } from '../../../api/entertainmentApi'
import Error from '../../Error/Error'
import CastDetails from '../CastDetails'
import MovieHero from './MovieHero'
import MovieRecommendations from './MovieRecommendations'

const MovieDetails = () => {
  const params = useParams()
  const history = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [movie, setMovie] = useState(null)
  const [movieCast, setMovieCast] = useState(null)
  const [movieRecommendations, setMovieRecommendations] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([GetMovieDetails(), GetMovieCast(), GetMovieRecommendations()]).then(() => setLoading(false))
  }, [params.id])

  const GetMovieDetails = async () => {
    await fetchMovieDetails(params.id)
      .then(res => setMovie(res.data))
      .catch(err => setError(err.message))
  }

  const GetMovieCast = async () => {
    await fetchMovieCast(params.id)
      .then(res => setMovieCast(res.data))
      .catch(err => setError(err.message))
  }

  const GetMovieRecommendations = async () => {
    await fetchMovieRecommndations(params.id)
      .then(res => setMovieRecommendations(res.data))
      .catch(err => setError(err.message))
  }

  if (error) return <Error message={error} />
  if (loading) return <Loader size={'lg'} backdrop content='loading...' vertical />

  return (
    <>
      {!loading && (
        <div className='page-container'>
          <MovieHero movie={movie} />
          <CastDetails cast={movieCast} />
          <MovieRecommendations movieRecommendations={movieRecommendations} history={history} />
        </div>
      )}
    </>
  )
}

export default MovieDetails
