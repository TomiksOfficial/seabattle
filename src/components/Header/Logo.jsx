import React from 'react';
import logo from ".//../../img/Logo.png"
import clasess from './Logo.module.css';

function Logo() {
  return (
    <div className={clasess.logo}>
        <img src={logo}/>
    </div>
  );
}

export default Logo;
