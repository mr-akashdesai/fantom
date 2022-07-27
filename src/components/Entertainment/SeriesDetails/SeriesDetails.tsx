import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader } from 'rsuite'
import CastDetails from '../CastDetails'
import SeriesHero from './SeriesHero'
import SeriesRecommendations from './SeriesRecommendations'

const SeriesDetails = () => {

    const params = useParams()
    const history = useNavigate()
    const [loading, setLoading] = useState(true)
    const [series, setSeries] = useState(null)
    const [seriesCast, setSeriesCast] = useState(null)
    const [seriesRecommendations, setSeriesRecommendations] = useState(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([
        GetSeriesDetails(),
        GetSeriesCast(),
        GetSeriesRecommendations()]).
        then(() =>  setLoading(false))
    },[params.id])

    const GetSeriesDetails = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/tv/${params.id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`)
        .then((res) => setSeries(res.data))
        .catch((err) => console.error(err))
    }

    const GetSeriesCast = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/tv/${params.id}/credits?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`)
        .then((res) => setSeriesCast(res.data))
        .catch((err) => console.error(err))
    }

    const GetSeriesRecommendations = async () => {
        await axios.get(`${process.env.MOVIE_DB_URL}/tv/${params.id}/similar?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`)
        .then((res) => setSeriesRecommendations(res.data))
        .catch((err) => console.error(err))
    }



    // if (error) { return <div>Error</div> }
    if (loading) { return <Loader size={'lg'} backdrop content="loading..." vertical /> }
    return (
        <>
        {!loading &&
        <div className="page-container">
            <SeriesHero {...series} />
            <CastDetails {...seriesCast} />
            <SeriesRecommendations seriesRecommendations={seriesRecommendations} history={history} />
        </div>}
        </>)

}

export default SeriesDetails