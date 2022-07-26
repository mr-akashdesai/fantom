import React from 'react'
import defaultProfilePicture from '../../assets/images/blank-profile-pic.webp'

const CastDetails = (cast: any) => {


return (
    <>
    {!!cast && cast.cast.length > 0 &&
    <div className="cast__container">
        <div className="cast__heading"><h4>Cast</h4></div>
        <div className="cast__grid">
            {cast.cast.map((person: any, index: number) => 
            <div className="cast__item" key={index} id={index.toString()}>
            <img key={index} className="cast__profilePic" 
            src={person.profile_path ? `${process.env.MOVIE_DB_IMAGE_URL}${person.profile_path}` : defaultProfilePicture} 
            onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src=defaultProfilePicture
            }}/>
            <div className="cast__name"> {person.name} </div>
            <div className="cast__character"> {person.character} </div>
        </div>)}
        </div>
    </div>}

</>)

}

export default CastDetails