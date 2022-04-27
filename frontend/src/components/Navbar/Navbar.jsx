import React from 'react';
import {  Link } from "react-router-dom";
import long_logo from '../../assets/images/long-RyderExpress.svg';
export const Navbar= () =>{
  return (
    <div className='Navbar'>
        <img src={long_logo} alt="Ryder Express" width="60%"/>
    </div>
  );
}