import React from 'react'
import { RenderTvShows, SectionType } from '../movieRenderHelpers'

type SeriesRecommendationsProps = {
    seriesRecommendations: any;
    history: any;
}

const SeriesRecommendations = ({seriesRecommendations, history} : SeriesRecommendationsProps) => {
    return (
        <>
        {!!seriesRecommendations &&
        <div className="recommendations__container">
            <RenderTvShows 
                data={seriesRecommendations} 
                type={SectionType.similar} 
                history={history}
                title={'You might also like 👀 ....'}
            />
        </div>}
        </>
    )
}

export default SeriesRecommendations