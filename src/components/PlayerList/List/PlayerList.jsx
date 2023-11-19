import React, { useState, useEffect } from 'react';
import classes from './PlayerList.module.css';
import Player from '../Player.jsx';
import Img from '../../../img/anchor.png'
import { socketIO } from '../../../'



const PlayerList = () => {

  const [players, setPlayers] = useState({});

  useEffect(() => {
	
	socketIO.emit("AddNewUser")

  }, []);

  //AddNewUser (data,callback)

  return (
    <div className={classes.list} >
      <div className={classes.headerList}>
        <span>List of Players</span>
      </div>
      <div className={classes.players}>
        {/* <Player nickname='Br0k0da' /> */}
		{
			Object.values(players).map((item, index) => {
				return <Player nickname={item.nickname} key={index} />;
			})
		}
      </div>
      <div>
        <img src={Img} className={classes.img} />
      </div>
    </div>
  );
}

export default PlayerList;
