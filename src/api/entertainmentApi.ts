import axios from 'axios'
import SeriesDetails from '../components/Entertainment/SeriesDetails/SeriesDetails'

export const fetchTrending = async () => {
  return await axios.get(`${process.env.MOVIE_DB_URL}/trending/all/day?api_key=${process.env.MOVIE_DB_API_KEY}`)
}

export const fetchMoviesByPageNumber = async (pageNumber: number) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/discover/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
  )
}

export const fetchUpcomingMoviesByPageNumber = async (pageNumber: number) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/movie/upcoming?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`
  )
}

export const fetchTopRatedMoviesByPageNumber = async (pageNumber: number) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/movie/top_rated?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`
  )
}

export const fetchTVShowsByPageNumber = async (pageNumber: number) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/tv/popular?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`
  )
}

export const fetchTopRatedTVShowsByPageNumber = async (pageNumber: number) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/tv/top_rated?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${pageNumber}`
  )
}

export const fetchSearchResults = async (searchText: string) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/search/multi?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`
  )
}

export const fetchMovieDetails = async (movieId: string) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/movie/${movieId}}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
  )
}

export const fetchMovieCast = async (movieId: string) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/movie/${movieId}/credits?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
  )
}

export const fetchMovieRecommndations = async (movieId: string) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/movie/${movieId}/similar?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
  )
}

export const fetchSeriesDetails = async (seriesId: string) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/tv/${seriesId}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
  )
}

export const fetchSeriesCast = async (seriesId: string) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/tv/${seriesId}/credits?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
  )
}

export const fetchSeriesRecommendations = async (seriesId: string) => {
  return await axios.get(
    `${process.env.MOVIE_DB_URL}/tv/${seriesId}/similar?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
  )
}
