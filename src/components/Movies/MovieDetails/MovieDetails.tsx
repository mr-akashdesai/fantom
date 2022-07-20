import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {

    const params = useParams()

    return <div className="page-container">{params.id}</div>
}

export default MovieDetails
