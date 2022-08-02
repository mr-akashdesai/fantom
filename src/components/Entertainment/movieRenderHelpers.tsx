import { format } from 'date-fns'
import React from 'react'
import { RiStarSFill } from 'react-icons/ri'
import { Button } from 'rsuite'
import { toggleOverflowWrapper } from '../../utils/toggleOverflowWrapper'
import noPicFound from '../../assets/images/no-image.jpeg'

export enum SectionType {
  trending = 'trending',
  popular = 'popular',
  upcoming = 'upcoming',
  topRated = 'topRated',
  similar = 'similar'
}

const determineTitle = (sectionType: SectionType) => {
  switch (sectionType) {
    case SectionType.popular:
      return 'Popular'
    case SectionType.topRated:
      return 'Top Rated'
    case SectionType.trending:
      return 'Trending'
    case SectionType.upcoming:
      return 'Upcoming'
    case SectionType.similar:
      return 'Similar'
  }
}

type renderProps = {
  data: any
  type: SectionType
  history: any
  overFlowWrapper?: boolean
  title?: string
}

export const redirectToCorrectMediaType = (mediaType: string, id: number) => {
  switch (mediaType) {
    case 'movie':
      return `movie-details/${id}`
    case 'tv':
      return `series-details/${id}`
  }
}

export const RenderMovies = ({ data, type, history, overFlowWrapper, title }: renderProps) => {
  return (
    <>
      {!!data && data.results.length > 0 && (
        <div className='movies__gridContainer'>
          <div className='movies__heading'>
            <h4>{title ? title : determineTitle(type)}</h4>
          </div>
          <div id={type} className={overFlowWrapper ? 'movie__container movie__overflowWrapper' : 'movie__container'}>
            {data &&
              data.results.map((movie: any, index: number) => (
                <div
                  key={index}
                  className='movie__itemContainer'
                  onClick={() => history(`/entertainment/movie-details/${movie.id}`)}>
                  <img
                    className='movie__posterImage'
                    src={`${process.env.MOVIE_DB_IMAGE_SMALL_URL}${movie.poster_path}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null // prevents looping
                      currentTarget.src = noPicFound
                    }}
                  />
                  <div className='movie__itemInfo'>
                    <span className='movie__voteAverageStar'>
                      <RiStarSFill />
                    </span>
                    <span className='movie__voteAverageRating'>&nbsp;{movie.vote_average.toFixed(1)}</span>
                    <span className='movie__releaseDate'>
                      {movie.release_date && format(new Date(movie.release_date), 'yyyy')}
                    </span>
                  </div>
                  <div className='movie__itemTitle'>
                    {movie.title}
                    {movie.name}
                  </div>
                </div>
              ))}
          </div>
          {overFlowWrapper && (
            <Button
              id={`toggle-${type}`}
              className='drawer-button'
              onClick={() => toggleOverflowWrapper(type, `toggle-${type}`, '50rem', 'More...', 'Less...')}
              block>
              More...
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export const RenderTvShows = ({ data, type, history, overFlowWrapper, title }: renderProps) => {
  return (
    <>
      {!!data && data.results.length > 0 && (
        <div className='movies__gridContainer'>
          <div className='movies__heading'>
            <h4>{title ? title : determineTitle(type)}</h4>
          </div>
          <div id={type} className={overFlowWrapper ? 'movie__container movie__overflowWrapper' : 'movie__container'}>
            {data &&
              data.results.map((series: any, index: number) => (
                <div
                  key={index}
                  className='movie__itemContainer'
                  onClick={() => history(`/entertainment/series-details/${series.id}`)}>
                  <img
                    className='movie__posterImage'
                    src={`${process.env.MOVIE_DB_IMAGE_SMALL_URL}${series.poster_path}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null // prevents looping
                      currentTarget.src = noPicFound
                    }}
                  />
                  <div className='movie__itemInfo'>
                    <span className='movie__voteAverageStar'>
                      <RiStarSFill />
                    </span>
                    <span className='movie__voteAverageRating'>&nbsp;{series.vote_average.toFixed(1)}</span>
                    <span className='movie__releaseDate'>
                      {series.first_air_date && format(new Date(series.first_air_date), 'yyyy')}
                    </span>
                  </div>
                  <div className='movie__itemTitle'>{series.name}</div>
                </div>
              ))}
          </div>
          {overFlowWrapper && (
            <Button
              id={`toggle-${type}`}
              className='drawer-button'
              onClick={() => toggleOverflowWrapper(type, `toggle-${type}`, '50rem', 'More...', 'Less...')}
              block>
              More...
            </Button>
          )}
        </div>
      )}
    </>
  )
}
