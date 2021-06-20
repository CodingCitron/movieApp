import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import { Row, Button } from 'antd'
import Favorite from './Sections/Favorite'


export default function MovieDetail(props){

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
       
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endPointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })

        fetch(endPointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }


    return (
        <div>

        {/* Header */}
        <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview} />
        {/* Body */}
        <div style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 1rem'}}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
            </div>
            {/* Movie Info */}
            <MovieInfo 
                movie={ Movie }
            />
            {/* Actor Grid */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <Button type='button' onClick={toggleActorView}> Toggle Actor View </Button>
            </div>

            {ActorToggle &&
                <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}`:null
                                    }
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            }
        </div>



        </div>
    )
}