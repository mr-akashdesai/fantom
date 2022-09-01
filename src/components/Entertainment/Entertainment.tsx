/* eslint-disable quotes */
import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonToolbar, Loader } from 'rsuite'
import {
  fetchMoviesByPageNumber,
  fetchTopRatedMoviesByPageNumber,
  fetchTopRatedTVShowsByPageNumber,
  fetchTrending,
  fetchTVShowsByPageNumber,
  fetchUpcomingMoviesByPageNumber
} from '../../api/entertainmentApi'
import Error from '../Error/Error'
import { SectionType, RenderMovies, RenderTvShows } from './movieRenderHelpers'
import MultiSearch from './MultiSearch'
import Trending from './Trending'

enum Type {
  movies = 1,
  tvShows = 2
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
    Promise.all([getTrendingData(), getMovieData(), getTvShowData()]).then(() => setLoading(false))
  }, [pageNumber])

  const getTrendingData = async () => {
    fetchTrending()
      .then(res => setTrending(res.data.results))
      .catch(err => setError(err.message))
  }

  const getMovieData = async () => {
    fetchMoviesByPageNumber(pageNumber)
      .then(res => setMovies(res.data))
      .catch(err => setError(err.message))

    fetchUpcomingMoviesByPageNumber(pageNumber)
      .then(res => setUpcomingMovies(res.data))
      .catch(err => setError(err.message))

    fetchTopRatedMoviesByPageNumber(pageNumber)
      .then(res => setTopRatedMovies(res.data))
      .catch(err => setError(err.message))
  }

  const getTvShowData = async () => {
    fetchTVShowsByPageNumber(pageNumber)
      .then(res => setTvShows(res.data))
      .catch(err => setError(err.message))

    fetchTopRatedTVShowsByPageNumber(pageNumber)
      .then(res => setTopRatedTvShows(res.data))
      .catch(err => setError(err.message))
  }

  const setPageNumberInput = (input: string) => {
    const int = parseInt(input)
    !isNaN(int) && setPageNumber(int)
  }

  const Popular = () => (
    <div className='movies__popular'>
      {selectedType === Type.movies && (
        <RenderMovies data={movies} type={SectionType.popular} history={history} overFlowWrapper />
      )}
      {selectedType === Type.tvShows && (
        <RenderTvShows data={tvShows} type={SectionType.popular} history={history} overFlowWrapper />
      )}
    </div>
  )

  const Upcoming = () => (
    <div className='movies__upcoming'>
      {selectedType === Type.movies && (
        <RenderMovies data={upcomingMovies} type={SectionType.upcoming} history={history} overFlowWrapper />
      )}
    </div>
  )

  const TopRated = () => (
    <div className='movies__upcoming'>
      {selectedType === Type.movies && (
        <RenderMovies data={topRatedMovies} type={SectionType.topRated} history={history} overFlowWrapper />
      )}
      {selectedType === Type.tvShows && (
        <RenderTvShows data={topRatedTvShows} type={SectionType.topRated} history={history} overFlowWrapper />
      )}
    </div>
  )

  const TypeToggle = () => (
    <div id={'button-container'} className='movies__buttonContainer'>
      <ButtonToolbar>
        <Button className='movies__paginationBtn' onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}>
          <IoIosArrowBack />
        </Button>
        <div className='movies__pageNumber'>
          <DebounceInput
            value={pageNumber}
            minLength={1}
            debounceTimeout={500}
            onChange={event => setPageNumberInput(event.target.value)}
          />
        </div>
        <Button className='movies__paginationBtn' onClick={() => setPageNumber(pageNumber + 1)}>
          <IoIosArrowForward />
        </Button>
      </ButtonToolbar>
      <Button
        onClick={() => setSelectedType(Type.movies)}
        className={selectedType === Type.movies ? 'movies__selectedType' : 'movies__unSelectedType'}
        appearance='ghost'>
        Movies
      </Button>
      <Button
        onClick={() => setSelectedType(Type.tvShows)}
        className={selectedType === Type.tvShows ? 'movies__selectedType' : 'movies__unSelectedType'}
        appearance='ghost'>
        TV Shows
      </Button>
    </div>
  )

  if (loading) return <Loader size={'lg'} backdrop content='loading...' vertical />
  if (error) return <Error message={error} />

  return (
    <>
      {!loading && (
        <div className='page-container'>
          <div className='movies__header'>
            <h3>Entertainment 🍿</h3>
            <MultiSearch />
          </div>
          <Trending data={trending} />
          <TypeToggle />
          <Popular />
          <Upcoming />
          <TopRated />
        </div>
      )}
    </>
  )
}

export default Entertainment
