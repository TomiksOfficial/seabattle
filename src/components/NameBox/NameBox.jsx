import React from 'react';
import classes from './NameBox.module.css'

let playername = 'Test';

const NameBox = () => {
  return (
    <div className={classes.name} >
        <span>Nickname: {playername}</span> 
    </div>
  );
}

export default NameBox;
