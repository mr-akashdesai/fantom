import { format } from 'date-fns'
import React from 'react'
import { ReactCountryFlag } from 'react-country-flag'
import { RiStarSFill } from 'react-icons/ri'
import defaultBackdrop from '../../../assets/images/default-hero-image.jpeg'

const MovieHero = (movie: any) => {

    const Genres = () => {
        const genres = new Array<string>(movie.genres.map((genre: { name: any }) => genre.name))
        return genres.toString()
    }

    return    (
    <>
    {!!movie &&
        <div className="hero__container">
            <img className="hero__backdropImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${movie.backdrop_path}`}
                onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src=defaultBackdrop
            }} />
            <img className="hero__posterImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${movie.poster_path}`} />
            <div className='hero__title'>{movie.title}&nbsp;
            <span className='trending__releaseDate'>&nbsp;{format(new Date(movie.release_date), 'yyyy')}</span>
            <span className='hero__productionCountries'>
            {movie.production_countries.map((country: any, index: number) => <ReactCountryFlag key={index} countryCode={country.iso_3166_1} svg />)}
            </span>
            </div>
            <div className='hero__tagline'><i>{movie.tagline.substring(0, movie.tagline.length - 1)}</i>&nbsp;
            <span className='hero__vote_aveage'>{movie.tagline && '|'}<span className="trending__voteAverageStar">&nbsp;<RiStarSFill /></span>
            &nbsp;{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className='hero__genres'><b>Genre:&nbsp;</b>
            {Genres()}
            </div>
        <div className='hero__runtime'><b>Duration:&nbsp;</b>{movie.runtime}&nbsp;min</div>
        <div className='hero__releaseDate'><b>Release Date:&nbsp;</b>{format(new Date(movie.release_date), 'dd-MM-yyyy')}</div>
        <div className='hero__productionCompanies'>
            {movie.production_companies.map(((company : any, index : number) => 
            company.logo_path && <img key={index} className="hero__productionLogo" src={`${process.env.MOVIE_DB_IMAGE_URL}${company.logo_path}`} /> ))}
        </div>
            <div className='hero__overview'>
                {movie.overview}
            </div>
    </div>} 
    </>)

}

export default MovieHero