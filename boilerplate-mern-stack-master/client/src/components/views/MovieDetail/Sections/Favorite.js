import React, { useEffect } from 'react'
import { Button } from 'antd'
import Axios from 'axios'

export default function Favorite(props){
    
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    useEffect(() => {
        let variable = {
            userFrom,
            movieId,
        }

        Axios.post('/api/favorite/favoriteNumber', variable)
        .then(response => {
            console.log('??' + response.data)
            if(response.data.success){

            }else{
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })

        Axios.post('/api/favorite/favorited', variable)
        .then(response => {
            console.log('??' + response.data)
            if(response.data.success){

            }else{
                alert('정보를 가져오는데 실패했습니다.')
            }
        })

    }, [])
    
    return (

        <Button type='button'>favorite</Button>

    )
}