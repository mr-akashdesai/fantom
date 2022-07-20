/* eslint-disable quotes */
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Button, Loader } from 'rsuite'
import {RiStarSFill} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { toggleOverflowWrapper } from '../../utils/toggleOverflowWrapper'
import Trending from './Trending'

enum Type {
    movies = 1,
    tvShows = 2,
}

enum SectionType {
    trending = 'trending',
    popular = 'popular',
    upcoming = 'upcoming',
    topRated =  'topRated',
}

const Movies = () => {

    const history = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [trending, setTrending] = useState(null)
    const [carouselIndex, setCarouselIndex] = useState(1)

    const [movies, setMovies] = useState(null)
    const [tvShows, setTvShows] = useState(null)
    const [topRatedTvShows, setTopRatedTvShows] = useState(null)

    const [upcomingMovies, setUpcomingMovies] = useState(null)
    const [upcomingTvShows, setUpcomingTvShows] = useState(null)
    const [topRatedMovies, setTopRatedMovies] = useState(null)
    

    const [pageNumber, setPageNumber] = useState(1)
    const [selectedType, setSelectedType] = useState(Type.movies)
    
    useEffect(() => {
        getTrending()
        getMovies()
        getTvShows()
    }, [pageNumber])

    const getTrending = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/trending/all/day?api_key=${process.env.MOVIE_DB_API_KEY}`)
        .then((res) =>{ 
            setTrending(res.data) 
        })
        .catch((err) => console.error(err))
    }

    const getMovies = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/discover/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
        .then((res) => setMovies(res.data))
        .catch((err) => console.log(err))

        await axios.get(`${process.env.MOVIE_DB_URL}/movie/upcoming?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`)
        .then((res) => setUpcomingMovies(res.data))
        .catch((err) => console.log(err))

        await axios.get(`${process.env.MOVIE_DB_URL}/movie/top_rated?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`)
        .then((res) => setTopRatedMovies(res.data))
        .catch((err) => console.log(err))
    }

    const getTvShows = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/tv/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`)
        .then((res) => setTvShows(res.data))
        .catch((err) => console.log(err))

        await axios.get(`${process.env.MOVIE_DB_URL}/tv/top_rated?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`)
        .then((res) => setTopRatedTvShows(res.data))
        .catch((err) => console.log(err))
        .then(() => setLoading(false))
    }


    const determineTitle = (sectionType: SectionType) => {
        switch (sectionType) {
            case SectionType.popular: return 'Popular'
            case SectionType.topRated: return 'Top Rated'
            case SectionType.trending: return 'Trending'
            case SectionType.upcoming: return 'Upcoming'
        }
    }


    const renderMovies = (data: any, type: SectionType) => 
        <div className="movies__gridContainer">
            <div className="movies__heading">
                <h4>{determineTitle(type)}</h4>
                </div>
            <div id={type} className="movie__container movie__overflowWrapper">
                {data && data.results.map((movie: any, index: number) => 
                <div key={index} className="movie__itemContainer" onClick={() => history(`/movie-details/${movie.id}`)}>
                    <img className="movie__posterImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${movie.poster_path}`} />
                    <div className="movie__itemInfo">
                        <span className="movie__voteAverageStar"><RiStarSFill /></span> 
                        <span className="movie__voteAverageRating">&nbsp;{movie.vote_average.toFixed(1)}</span>
                        <span className="movie__releaseDate">{format(new Date(movie.release_date), 'yyyy')}</span>
                    </div>
                    <div className="movie__itemTitle">{movie.title}{movie.name}</div>
                </div>)}
            </div>
            <Button id={`toggle-${type}`} onClick={() => toggleOverflowWrapper(type)}block>More...</Button>
        </div>

    const renderTvShows = (data: any, type: SectionType) => 
        <div className="movies__gridContainer">
            <div className="movies__heading">
                <h4>{determineTitle(type)}</h4>
                </div>
            <div id={type} className="movie__container movie__overflowWrapper">
            {data && data.results.map((series: any, index: number) => 
                <div key={index} className="movie__itemContainer" onClick={() => history(`/series-details/${series.id}`)}>
                    <img className="movie__posterImage" src={`${process.env.MOVIE_DB_IMAGE_URL}${series.poster_path}`} />
                    <div className="movie__itemInfo">
                    <span className="movie__voteAverageStar"><RiStarSFill /></span> 
                    <span className="movie__voteAverageRating">&nbsp;{series.vote_average.toFixed(1)}</span>
                    <span className="movie__releaseDate">{format(new Date(series.first_air_date), 'yyyy')}</span>
                    </div>
                    <div className="movie__itemTitle">{series.name}</div>
                </div>)}
            </div>
            <Button id={`toggle-${type}`} onClick={() => toggleOverflowWrapper(type)}block>More...</Button>
        </div>

    const Popular = () =>         
    <div className="movies__popular">
            {selectedType === Type.movies && renderMovies(movies, SectionType.popular)}
            {selectedType === Type.tvShows && renderTvShows(tvShows, SectionType.popular)}
    </div>

    const Upcoming = () => 
        <div className="movies__upcoming">
            {selectedType === Type.movies && renderMovies(upcomingMovies, SectionType.upcoming)}
        </div>

    const TopRated = () =>
    <div className="movies__upcoming">
        {selectedType === Type.movies && renderMovies(topRatedMovies, SectionType.topRated)}
        {selectedType === Type.tvShows && renderTvShows(topRatedTvShows, SectionType.topRated)}
    </div>

    const TypeToggle = () =>   
        <div className="movies__buttonContainer">
            <Button onClick={() => setSelectedType(Type.movies)} 
            className={selectedType === Type.movies ? 'movies__selectedType' : 'movies__unSelectedType'}
            appearance="ghost"> 
            Movies 
            </Button>
            <Button onClick={() => setSelectedType(Type.tvShows)}  
            className={selectedType === Type.tvShows ? 'movies__selectedType' : 'movies__unSelectedType'}
            appearance="ghost"> 
            TV Shows
            </Button>
        </div>


    if (error) { return <div>Error</div> }
    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }
    
    return ( 
    <>
    {!loading &&
    <div className="page-container">
        <h2>Movies & TV 🍿</h2>
        <div className="movies__trending">
            <Trending {...trending} />
        </div>
        <TypeToggle />
        <Popular />
        <Upcoming />
        <TopRated />
    </div>}
    </>
    )
}

export default Movies