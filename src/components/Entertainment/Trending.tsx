import React from 'react'
import { format } from 'date-fns'
import { RiStarSFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { redirectToCorrectMediaType } from './movieRenderHelpers'

const Trending = ({ data }: any) => {
  const history = useNavigate()
  return (
    <div className='movies__gridContainer'>
      <div className='movies__heading'>
        <h4>Trending Today</h4>
      </div>
      <div className='trending__container'>
        {data &&
          data.map((item: any, index: number) => (
            <div
              key={index}
              className={'trending__itemContainer'}
              onClick={() => history(redirectToCorrectMediaType(item.media_type, item.id))}>
              <div className='trending__gradient'>
                <img
                  className='trending__backdropImage'
                  src={`${process.env.MOVIE_DB_IMAGE_URL}${item.backdrop_path}`}
                />
                <img className='trending__posterImage' src={`${process.env.MOVIE_DB_IMAGE_URL}${item.poster_path}`} />
                <div className='trending__itemTitle'>
                  {item.title}
                  {item.name}
                  <span className='trending__releaseDate'>
                    {item.release_date && format(new Date(item.release_date), 'yyyy')}
                    {item.first_air_date && format(new Date(item.first_air_date), 'yyyy')}
                  </span>
                </div>
                <div className='trending__itemInfo'>
                  <span className='trending__voteAverageStar'>
                    <RiStarSFill />
                  </span>
                  <span className='trending__voteAverageRating'>&nbsp;{item.vote_average.toFixed(1)}</span>
                </div>

                <div className='trending__overview'>{item.overview}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Trending
