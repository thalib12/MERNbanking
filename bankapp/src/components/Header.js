import React from 'react'
import "./header.css"

function Header() {
    return (
        <div className='header'>
            <h3 className='rdp' style={{marginLeft:"40%"}}><i class="fas fa-hand-holding-usd" style={{marginRight:"10px"}}/>MERN Banking</h3>
            <p className='ptext' style={{color:"white",marginLeft:"25%"}}>CONTACT: 1800-8089-1217</p>
            
        </div>
    )
}

export default Header
