import React from 'react'
import { Col } from 'antd'

export default function GridCards(props) {
    
   if(props.landingPage){ 
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '360px' }} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
   }else{
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    {props.image ? 
                        <img style={{ width: '100%', height: '360px' }} src={props.image} alt={props.characterName}/> 
                        :
                        <div style={{ width: '100%', height: '360px', backgroundColor: '#eee' }}>{props.characterName}
                            
                        </div>
                    }
                </div>
            </Col>
        )
   }
}
