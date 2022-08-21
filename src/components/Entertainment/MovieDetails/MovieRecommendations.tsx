import React from 'react'
import { RenderMovies, SectionType } from '../movieRenderHelpers'

const MovieRecommendations = ({ movieRecommendations, history }: any) => {
  return (
    <div className='recommendations__container'>
      <RenderMovies
        data={movieRecommendations}
        type={SectionType.similar}
        history={history}
        title={'You might also like 👀 ....'}
      />
    </div>
  )
}

export default MovieRecommendations
