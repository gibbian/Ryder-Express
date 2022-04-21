import React from 'react';
import {  Link } from "react-router-dom";
export const Navbar= () =>{
  return (
    <div className='Navbar'>
        <a className='Home'>
        <Link to="/">Home</Link>
        </a>
        <a>
        <Link to="/ProductPage">Product Page</Link>
        </a>
        <a>
        <Link to="/Profile" className='Profile'>Profile</Link>
        </a>
    </div>
  );
}