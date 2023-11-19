import React from 'react';
import classes from './Player.module.css'
import invited from '../../img/invited.png'


const Player = (props) => {
  return (
    <div className={classes.player}>
      <span>{props.nickname}</span>
      <img src={invited} className={classes.invited}/>
    </div>
  );
}

export default Player;
