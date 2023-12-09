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

			dispatch(setPlayerTurn(data));
		});

		socketIO.on("StartGame", (data) => {
			data = JSON.parse(data);

			setBaseInfo(data);
		});

		socketIO.on("ChangePlayerTurn", () => {
			dispatch(setPlayerTurn({"player_turn": currentPlayer.player_turn ^ 1}));
		});

		socketIO.on("GameEnd", (data) => {
			setBaseMap(Array(100).fill(0));
		});
	}, []);

    return (
		<div className={classes.grid}>
			{baseMap.map((value, index) => (
                <Checker
                    key={index}
                    coord={index}
					ship_attacked={value == -1 ? "black" : "#FEDEDE"}
					callback={() => {
						if(currentPlayer.player_turn != 2 && currentPlayer.inGame === true && value != -1)
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
								}
							});
						}
					}}
                />
            ))}
		</div>
    );
}

