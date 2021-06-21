import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Popover } from 'antd'
import './favorite.css'
import { IMAGE_BASE_URL } from '../../Config'

export default function FavoritePage(){

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {    
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/GetFavoriteMovie', { userFrom: localStorage.getItem('userId') })
        .then(response => {
            if(response.data.success){
                setFavorites(response.data.favorite)
            }else{
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        
        const variable = {
            movieId: movieId,
            userFrom: userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variable)
        .then(response => {
            if(response.data.success){
                fetchFavoredMovie()
            }else{
                alert('리스트에서 지우는데 실패했습니다.')
            }
        }) 
    }

    const renderCards = Favorites.map((favorite, index) => {
        console.log(favorite)
        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"    
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><Button onClick={() => {onClickDelete(favorite.movieId, favorite.userFrom)}}>Remove</Button></td>
        </tr>
    })

    return (
        <div style={{ maxWidth: '1400px', margin: '2rem auto', padding: '0 1rem' }}>
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Favorite Movies</h2>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Movie from favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}