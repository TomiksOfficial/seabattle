import React from 'react';
import classes from './PlayerList.module.css';
import Player from '../Player.jsx';
import Img from '../../../img/anchor.png'

const PlayerList = () => {
  return (
    <div className={classes.list} >
      <div className={classes.headerList}>
        <span>List of Players</span>
      </div>
      <div className={classes.players}>
        <Player nickname='Br0k0da' />
        <Player nickname='Tomiks' />
        <Player nickname='Sunlit' />
      </div>
      <div>
        <img src={Img} className={classes.img} />
      </div>
    </div>
  );
}

export default PlayerList;
