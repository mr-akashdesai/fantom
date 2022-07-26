import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from 'rsuite'
import CastDetails from '../CastDetails'
import MovieHero from './MovieHero'
import MovieRecommendations from './MovieRecommendations'

const MovieDetails = () => {

    const params = useParams()
    const history = useNavigate()
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState(null)
    const [movieCast, setMovieCast] = useState(null)
    const [movieRecommendations, setMovieRecommendations] = useState(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([
        GetMovieDetails(),
        GetMovieCast(),
        GetMovieRecommendations()]).
        then(() =>  setLoading(false))
    },[params.id])

    const GetMovieDetails = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/movie/${params.id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`)
        .then((res) => setMovie(res.data))
        .catch((err) => console.error(err))
    }

    const GetMovieCast = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/movie/${params.id}/credits?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`)
        .then((res) => setMovieCast(res.data))
        .catch((err) => console.error(err))
    }

    const GetMovieRecommendations = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/movie/${params.id}/similar?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`)
        .then((res) => setMovieRecommendations(res.data))
        .catch((err) => console.error(err))
    }



    // if (error) { return <div>Error</div> }
    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }
    return (
        <>
        {!loading &&
        <div className="page-container">
            <MovieHero {...movie} />
            <CastDetails {...movieCast} />
            <MovieRecommendations movieRecommendations={movieRecommendations} history={history} />
        </div>}
    </>)
}

export default MovieDetails
