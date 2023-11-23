import React, { useState, useEffect } from "react";
import classes from "./PlayerList.module.css";
import Player from "../Player.jsx";
import Img from "../../../img/anchor.png";
import { useSelector, useDispatch } from "react-redux";
import { socketIO } from "../../../index.js";
import { removeActivePlayers, setActivePlayers } from "../../../store/mainData.js";

const PlayerList = () => {
    //   const [players, setPlayers] = useState({});
    const players = useSelector((state) => state.mainData);
    const currentPlayer = useSelector((state) => state.currentPlayer);
	const dispatch = useDispatch();

    useEffect(() => {
		socketIO.on("NewPlayerAdded", (data) => {
			data = JSON.parse(data);
			// console.log(data);
			dispatch(setActivePlayers(data));
		});

		socketIO.on("PlayerDisconnect", (data) => {
			data = JSON.parse(data);
			// console.log(data);
			dispatch(removeActivePlayers(data));
		});

		// console.log(players)
	}, []);

    return (
        <div className={classes.list}>
            <div className={classes.headerList}>
                <span>List of Players</span>
            </div>
            <div className={classes.players}>
                {/* <Player nickname='Br0k0da' /> */}
                {Object.values(players).map((item, index) => {
                    // console.log(currentPlayer.id, item.id, item.nickname)
                    if (currentPlayer.id != item.id)
                        return <Player nickname={item.nickname} id={item.id} key={index} />;
                })}
            </div>
            <div>
                <img src={Img} className={classes.img} />
            </div>
        </div>
    );
};

export default PlayerList;
