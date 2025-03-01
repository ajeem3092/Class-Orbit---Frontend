import './Style.css';
import React from 'react'
import {NavLink} from 'react-router-dom';

function  NavBar() {
  return (
    <div className='navbar px-4 trans ' >
    <div><img  className='img' src="/image/images_low.png?v=1" ></img> </div>
   <div className='text-white'><span className='text-white fs-1' style={{ textDecoration: 'none', fontFamily: 'Verdana-Bold'}}>ClassOrbit</span></div>
   <NavLink to="/"  style={{ textDecoration: 'none' }}><span className="letter fs-3 text-white">Home</span></NavLink>
   <NavLink to="/about"  style={{ textDecoration: 'none' }}><span className="letter fs-3  text-white">About</span></NavLink>
   <NavLink to="/contact"  style={{ textDecoration: 'none' }}><span className="letter fs-3  text-white">Contact</span></NavLink>
   <NavLink to="/signin"  style={{ textDecoration: 'none' }}><button className="btn btn-warning letter fs-2 text-white bg-dark">Login</button></NavLink>
    </div>
  )
}

export default   NavBar ;