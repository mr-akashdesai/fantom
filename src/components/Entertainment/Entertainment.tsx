/* eslint-disable quotes */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonToolbar, Loader } from 'rsuite'
import { useNavigate } from 'react-router-dom'
import Trending from './Trending'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { SectionType, RenderMovies, RenderTvShows } from './movieRenderHelpers'
import { DebounceInput } from 'react-debounce-input'
import MultiSearch from './MultiSearch'

enum Type {
    movies = 1,
    tvShows = 2,
}

const Entertainment = () => {

    const history = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [trending, setTrending] = useState(null)

    const [movies, setMovies] = useState(null)
    const [tvShows, setTvShows] = useState(null)
    const [topRatedTvShows, setTopRatedTvShows] = useState(null)

    const [upcomingMovies, setUpcomingMovies] = useState(null)
    const [topRatedMovies, setTopRatedMovies] = useState(null)
    

    const [pageNumber, setPageNumber] = useState(1)
    const [selectedType, setSelectedType] = useState(Type.movies)
    
    useEffect(() => {
        setLoading(true)
        Promise.all([
            getTrending(),
            getMovies(),
            getTvShows(),])
        .then(() => setLoading(false))
    }, [pageNumber])

    const getTrending = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/trending/all/day?api_key=${process.env.MOVIE_DB_API_KEY}`)
        .then((res) => setTrending(res.data))
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
    }


    const Popular = () =>         
    <div className="movies__popular">
        {selectedType === Type.movies && <RenderMovies data={movies} type={SectionType.popular} history={history} overFlowWrapper/>}
        {selectedType === Type.tvShows && <RenderTvShows data={tvShows} type={SectionType.popular} history={history} overFlowWrapper/>}
    </div>

    const Upcoming = () => 
    <div className="movies__upcoming">
        {selectedType === Type.movies && <RenderMovies data={upcomingMovies} type={SectionType.upcoming} history={history} overFlowWrapper/>}
    </div>

    const TopRated = () =>
    <div className="movies__upcoming">
        {selectedType === Type.movies && <RenderMovies data={topRatedMovies} type={SectionType.topRated} history={history} overFlowWrapper/>} 
        {selectedType === Type.tvShows && <RenderTvShows data={topRatedTvShows} type={SectionType.topRated} history={history} overFlowWrapper/>}
    </div>

    const setPageNumberInput = (input: string) => {
        const int = parseInt(input)
        !isNaN(int) && setPageNumber(int)
    }

    const TypeToggle = () =>   
        <div id={'button-container'} className="movies__buttonContainer">
            <ButtonToolbar>
            <Button className="movies__paginationBtn" onClick={() => setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1)}><IoIosArrowBack/></Button>
            <div className="movies__pageNumber">
            <DebounceInput
                value={pageNumber}
                minLength={1}
                debounceTimeout={500}
                onChange={event => setPageNumberInput(event.target.value)} />
            </div>
            <Button className="movies__paginationBtn" onClick={() => setPageNumber(pageNumber + 1)}><IoIosArrowForward/></Button>
            </ButtonToolbar>
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
        <div className="movies__header">
            <h3>Entertainment 🍿</h3>
            <MultiSearch />
        </div>
        <Trending {...trending} />
        <TypeToggle />
        <Popular />
        <Upcoming />
        <TopRated />
    </div>}
    </>
    )
}

export default Entertainment