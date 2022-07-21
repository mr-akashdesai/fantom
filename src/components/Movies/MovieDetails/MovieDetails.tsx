import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { RiStarSFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import { Loader } from 'rsuite'

const MovieDetails = () => {

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        GetMovieDetails()
    },[])

    const GetMovieDetails = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/movie/${params.id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`)
        .then((res) => setMovie(res.data))
        .catch((err) => console.error(err))
        .then(() => setLoading(false))
    }

    const Genres = () => {
        const genres = new Array<string>(movie.genres.map((genre: { name: any }) => genre.name))
        return genres.toString()
    }

    const MovieHero = () =>    
    <div className="movieDetails__container">
        <div className="movieDetails__movieItem">
            <img className="movieDetails__backdropImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${movie.backdrop_path}`} />
            <div style={{clear: 'both'}}></div>
            <img className="movieDetails__posterImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${movie.poster_path}`} />
            <div className='movieDetails__title'>{movie.title}&nbsp;
            <span className='trending__releaseDate'>&nbsp;{movie.release_date && format(new Date(movie.release_date), 'yyyy')}</span>
            <span className='movieDetails__productionCountries'>
            {movie.production_countries.map((country: any) => <ReactCountryFlag countryCode={country.iso_3166_1} svg />)}
            </span>
            </div>
            <div className='movieDetails__tagline'><i>{movie.tagline.substring(0, movie.tagline.length - 1)}</i>&nbsp;
            <span className='movieDetails__vote_aveage'>|<span className="trending__voteAverageStar">&nbsp;<RiStarSFill /></span>
            &nbsp;{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className='movieDetails__genres'><b>Genre:&nbsp;</b>
            {Genres()}
            </div>
        <span className='movieDetails__runtime'><b>Duration:&nbsp;</b>{movie.runtime}&nbsp;min</span>
        <div className='movieDetails__productionCompanies'>
            {movie.production_companies.map(((company : any) => 
            company.logo_path && <img className="movieDetails__productionLogo" src={`${process.env.MOVIE_DB_IMAGE_URL}${company.logo_path}`} /> ))}
        </div>
            <div className='movieDetails__overview'>{movie.overview}</div>
        </div> 
    </div>

        
    // if (error) { return <div>Error</div> }
    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }


    return (
        <>
        {!loading &&
        <div className="page-container">
            <MovieHero />
        </div>}
    </>)
}

export default MovieDetails
