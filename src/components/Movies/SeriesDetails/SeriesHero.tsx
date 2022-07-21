import { format } from 'date-fns'
import React from 'react'
import { ReactCountryFlag } from 'react-country-flag'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { RiStarSFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Button } from 'rsuite'

const SeriesHero = (series: any) => {

    const history = useNavigate()
    const Genres = () => {
        const genres = new Array<string>(series.genres.map((genre: { name: any }) => genre.name))
        return genres.toString()
    }

    return (
    <>
    {!!series &&
    <div className="hero__container">
            <Button active className="hero__backBtn" appearance="subtle" onClick={() => history(-1)}><IoMdArrowRoundBack size={'2rem'}/></Button>
            <img className="hero__backdropImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${series.backdrop_path}`} />
            <img className="hero__posterImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${series.poster_path}`} />
            <div className='hero__title'>{series.name}&nbsp;
            <span className='hero__seasons'>S{series.last_episode_to_air.season_number}:E{series.last_episode_to_air.episode_number}</span>
            <span className='trending__releaseDate'>&nbsp;{format(new Date(series.first_air_date), 'yyyy')}</span>
            <span className='hero__productionCountries'>
            {series.production_countries.map((country: any, index: number) => <ReactCountryFlag key={index} countryCode={country.iso_3166_1} svg />)}
            </span>
            </div>
            <div className='hero__tagline'><i>{series.tagline.substring(0, series.tagline.length - 1)}</i>&nbsp;
            <span className='hero__vote_aveage'>{series.tagline && '|'}<span className="trending__voteAverageStar">&nbsp;<RiStarSFill /></span>
            &nbsp;{series.vote_average.toFixed(1)}</span>
            </div>
            <div className='hero__genres'><b>Genre:&nbsp;</b>
            {Genres()}
            </div>
        <div className='hero__runtime'><b>Episode Runtime:&nbsp;</b>{series.episode_run_time}&nbsp;min</div>
        <div className='hero__releaseDate'><b>Release Date:&nbsp;</b>{format(new Date(series.first_air_date), 'dd-MM-yyyy')}</div>
        <div className='hero__productionCompanies'>
            {series.production_companies.map(((company : any, index : number) => 
            company.logo_path && <img key={index} className="hero__productionLogo" src={`${process.env.MOVIE_DB_IMAGE_URL}${company.logo_path}`} /> ))}
        </div>
            <div className='hero__overview'>
                {series.overview}
            </div>
    </div>} 
    </>)

}

export default SeriesHero