import React from 'react'
import NavBar from '../NavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './style.css'
export const Top = () => {
  return (
    <header>
         <div className="nav-area">
                <Link to="/" className="logo">
                    Logo
                </Link>
                <NavBar />
            </div>  
    </header>          
  )
}

export default Top;