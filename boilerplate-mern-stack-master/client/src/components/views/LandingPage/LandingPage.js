import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import { Row, Button } from 'antd'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page==${CurrentPage}`
        fectchMovies(endPoint)
    }, [])

    const fectchMovies = (endPoint) => {
        fetch(endPoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${CurrentPage + 1}`
        fectchMovies(endPoint)
    }


    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            
            {/* Main Image */}
            {MainMovieImage&&
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
                />
            }

            <div style={{ maxWidth: '1400px', padding: '0 1rem', margin: '2rem auto' }}>
                <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Movie By latest</h2>
                
                {/* Movie Grid Card */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}`:null
                                }
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <Button type='button' onClick={loadMoreItems}>Load Mord</Button>
            </div>

        </div>
    )
}

export default LandingPage
