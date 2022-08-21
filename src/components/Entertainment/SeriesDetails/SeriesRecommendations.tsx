import React from 'react'
import { RenderTvShows, SectionType } from '../movieRenderHelpers'

const SeriesRecommendations = ({ seriesRecommendations, history }: any) => {
  return (
    <>
      {!!seriesRecommendations && (
        <div className='recommendations__container'>
          <RenderTvShows
            data={seriesRecommendations}
            type={SectionType.similar}
            history={history}
            title={'You might also like 👀 ....'}
          />
        </div>
      )}
    </>
  )
}

export default SeriesRecommendations
