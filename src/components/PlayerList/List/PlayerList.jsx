import React from 'react';
import classes from './PlayerList.module.css';
import Player from '../Player.jsx';


function PlayerList() {
  return (
    <div className={classes.list} >
      <div className={classes.headerList}>
        <span>List of Players</span>
      </div>
      <img />
    </div>
  );
}

export default PlayerList;
