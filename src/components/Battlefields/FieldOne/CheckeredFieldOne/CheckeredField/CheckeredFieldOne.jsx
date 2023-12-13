import React, { useState, useEffect } from "react";
import classes from "./CheckeredFieldOne.module.css";
import Checker from "../Checker";
import WinDefeat from '../../../../Modal/WinLose/WinLose.jsx';
import { socketIO } from "../../../../../";
import { useSelector, useDispatch } from "react-redux";
import { setGameState } from "../../../../../store/currentPlayer";

const CheckeredFieldOne = () => {

	const [baseMap, setBaseMap] = useState(Array(100).fill(0));
	const [ready, setReady] = useState(false);
	const [baseInfo, setBaseInfo] = useState({});
	const [modelWinDefeatActive, setModelWinDefeatActive] = useState(false);
	const [gameResult, setGameResult] = useState(false);
	const currentPlayer = useSelector(state => state.currentPlayer);
	const dispatch = useDispatch();

    useEffect(() => {
        socketIO.on("StartGame", (data) => {
			data = JSON.parse(data);

			setBaseInfo(data);

			dispatch(setGameState(true));
		});

		socketIO.on("GameEnd", (data) => {
			data = JSON.parse(data);

			setReady(false);
			dispatch(setGameState(false));
			setBaseInfo({});
			setBaseMap(Array(100).fill(0));

			// console.log(data.winner);
			// console.log(data.loser);
			// console.log(currentPlayer.id);

			if(data.winner == currentPlayer.id)
			{
				// show winner modal
				setGameResult(true);
				setModelWinDefeatActive(true);
			} else {
				// show loser modal
				setGameResult(false);
				setModelWinDefeatActive(true);
			}

			setTimeout(() => {
				setModelWinDefeatActive(false);
			}, 5000);
		});

		socketIO.on("ShootToYou", (data) => {
			// console.log(data);
			setBaseMap((prevMap) => {
				let newArray = [...prevMap];
				newArray[data.index] = 3;
				return newArray;
			});
		});
    }, [currentPlayer.id]);

    return (
		<div>
			<div className={classes.grid}>
				{baseMap.map((value, index) => (
					<Checker
						key={index}
						ship_setted={value}

						callback={() => {
							if(!ready && currentPlayer.inGame === true && value == 0)
							{
								socketIO.emit("GameAction", JSON.stringify({
									"state": "prepare",
									"player_turn": baseInfo.player_turn,
									"room_id": baseInfo.room_id,
									"player_id": socketIO.id,
									"ship_set": index
								}), (data) => {
									data = JSON.parse(data);

									if(baseInfo.count_ships > 0)
									{
										setBaseInfo((prevBaseInfo) => {
											prevBaseInfo = JSON.parse(JSON.stringify(prevBaseInfo));

											prevBaseInfo.count_ships -= 1;
											return prevBaseInfo;
										});

										setBaseMap(data.map);
									} else {
										setReady(true);
									}
								});
							}
						}}
					/>
				))}
			</div>
			<WinDefeat active={modelWinDefeatActive} setActive={setModelWinDefeatActive} gameStatus={gameResult} />
		</div>
    );
};

export default CheckeredFieldOne;
