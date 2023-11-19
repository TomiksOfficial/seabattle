import React from 'react';
import clasess from './Header.module.css';
import Logo from './Logo/Logo';
import Authorship from './Authorship/Authorship';
import Buttons from './Buttons/Buttons'

const Header = () => {
  return (
    <div className={clasess.header}>
      <Authorship />
      <Logo />
      <Buttons/>
    </div>
  );
}

export default Header;
