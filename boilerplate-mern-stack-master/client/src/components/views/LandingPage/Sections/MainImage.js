import React from 'react'

function MainImage(props){
    return(
        <div style={{ 
        position: 'relative',
        width: '100%',
        height: '75vh',
        backgroundColor: 'linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,0.65) 100%)',
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
        }}>
            <div style={{ position: 'absolute', bottom: '2rem', width: '100%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem'}}>
                    <h2 style={{ color: 'white' }}>{ props.title }</h2>
                    <p style={{ color: 'white', fontSize: '0.9rem' }}>{ props.text }</p>
                </div>
            </div>
        </div>
    )
}

export default MainImage