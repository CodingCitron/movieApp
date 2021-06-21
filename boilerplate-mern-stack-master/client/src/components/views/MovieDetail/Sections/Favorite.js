import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import Axios from 'axios'

export default function Favorite(props){
    
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    let variables = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.title,
        moviePost: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            setFavoriteNumber(response.data.favoriteNumber)
            if(response.data.success){
            }else{
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })

        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success){
                setFavorited(response.data.favorited)
            }else{
                alert('정보를 가져오는데 실패했습니다.')
            }
        })

    }, [])

    let onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite 리스트에서 지우는 것을 실패했습니다.')
                }
            })
        }else{
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite 리스트에서 추가하는 것을 실패했습니다.')
                }
            })
        }
    }
    
    return (
        <Button type='button' onClick={onClickFavorite}>{Favorited? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}</Button>
    )
}