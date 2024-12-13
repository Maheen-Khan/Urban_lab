import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Welcome to the Urban Soil Testing Lab</h2>
                <p>At our Soil Testing Lab, we are committed to helping you understand the health and composition of your soil.
          Our detailed soil analysis services offer insights that empower you to make informed decisions about
          improving your soil's quality, crop yield, and sustainability.</p>
                <button>View test</button>
            </div>
        </div>
    )
}

export default Header


/*
export const Header = () => {
  return (
    <div className="header">
        <div className="request-new-sample">
            <h2>Request New Sample</h2>
            <p>blah blah blah</p>
            <button>Request Soil</button>
        </div>
        <div className="my-samples">
            <h2>See your soil sample history</h2>
            <p>Blah blah blah</p>
            <button>My Samples</button>
        </div>
    </div>
  )
}

*/