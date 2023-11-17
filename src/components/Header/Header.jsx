import React from 'react';
import clasess from './Header.module.css'
import Logo from './Logo/Logo';
import Authorship from './Authorship/Authorship';

const Header = () => {
  return (
    <div className={clasess.header}>
      <Authorship />
      <Logo />
    </div>
  );
}

export default Header;
