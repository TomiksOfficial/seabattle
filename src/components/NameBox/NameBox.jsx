import React from 'react';
import classes from './NameBox.module.css'

function NameBox() {
  return (
    <div className={classes.name} >
        <span>Nickname:</span> 
    </div>
  );
}

export default NameBox;