import React from 'react';
import classes from './ChekeredFieldTwo.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { socketIO } from '../../../../..';
import { useDispatch, useSelector } from "react-redux";
import { setPlayerTurn } from '../../../../../store/currentPlayer';
import { Checker } from "../Checker";

export const ChekeredFieldTwo = () => {

	const [baseMap, setBaseMap] = useState(Array(100).fill(0));
	const [baseInfo, setBaseInfo] = useState({});
	const dispatch = useDispatch();
	const currentPlayer = useSelector(state => state.currentPlayer);

	useEffect(() => {
		socketIO.on("FullyStartGame", (data) => {
			data = JSON.parse(data);

			dispatch(setPlayerTurn({"player_turn": data[socketIO.id.toString()]}));
		});

		socketIO.on("StartGame", (data) => {
			data = JSON.parse(data);

			setBaseInfo(data);
		});

		socketIO.on("GameEnd", (data) => {
			setBaseMap(Array(100).fill(0));
			dispatch(setPlayerTurn({"player_turn":undefined}))
		});
	}, []);

	useEffect(() => {
		socketIO.on("ChangePlayerTurn", () => {
			// console.log("ChangePlayerTurn Event " + currentPlayer.player_turn);
			dispatch(setPlayerTurn({"player_turn": currentPlayer.player_turn ^ 1}));
		});
	}, [currentPlayer.player_turn]);

    return (
		<div className={classes.grid}>
			{baseMap.map((value, index) => (
                <Checker
                    key={index}
                    coord={index}
					ship_attacked={value}
					callback={() => {
						if(currentPlayer.player_turn == 0 && currentPlayer.inGame === true && value != -1)
						{
							socketIO.emit("GameAction", JSON.stringify({
								"state": "shoot",
								"player_turn": currentPlayer.player_turn,
								"room_id": baseInfo.room_id,
								"player_id": socketIO.id,
								"shoot_position": index
							}), (data) => {
								data = JSON.parse(data);

								if(data.hit === true)
								{
									setBaseMap(data.map_opponent);
								} else {
									setBaseMap((prevMap) => {
										prevMap[index] = 3;
										return prevMap;
									});
								}
							});
						}
					}}
                />
            ))}
		</div>
    );
}

