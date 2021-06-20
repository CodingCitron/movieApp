import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            borderTop: 'solid 1px #e8e8e8',
            boxShadow: '-0 -0 30px #f3f1f1'
        }}>
           <p style={{ marginTop: '1rem' }}> Happy Coding  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
