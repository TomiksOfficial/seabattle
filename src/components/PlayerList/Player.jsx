import React from 'react';
import classes from './Player.module.css'
import Img1 from '../../img/join.png'
import Img2 from '../../img/invited.png'


const Player = (props) => {
  return (
    <div className={classes.player}>
      <span>{props.nickname}</span>
      <img src={Img1} className={classes.img1} />
      <img src={Img2} className={classes.img2} />
    </div>
  );
}

export default Player;
