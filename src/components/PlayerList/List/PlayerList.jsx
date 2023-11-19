import React, { useState, useEffect } from 'react';
import classes from './PlayerList.module.css';
import Player from '../Player.jsx';
import Img from '../../../img/anchor.png'
import { useSelector } from 'react-redux';



const PlayerList = () => {

//   const [players, setPlayers] = useState({});
  const players = useSelector(state => state.mainData);
  const currentPlayer = useSelector(state => state.currentPlayer);

  return (
    <div className={classes.list} >
      <div className={classes.headerList}>
        <span>List of Players</span>
      </div>
      <div className={classes.players}>
        {/* <Player nickname='Br0k0da' /> */}
		{
			Object.values(players).map((item, index) => {
				console.log(currentPlayer.id)
				console.log(item.id)
				if(currentPlayer.id != item.id)
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
