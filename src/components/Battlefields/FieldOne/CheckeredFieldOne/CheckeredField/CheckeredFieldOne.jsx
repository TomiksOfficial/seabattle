import React, { useState, useEffect } from "react";
import classes from "./CheckeredFieldOne.module.css";
import Checker from "../Checker";
import { socketIO } from "../../../../../";
import { useSelector, useDispatch } from "react-redux";
import { setGameState } from "../../../../../store/currentPlayer";

const CheckeredFieldOne = () => {
    // let [checkers, setCheckers] = useState([
    //     { x: 1, y: 1, status: 1 },
    //     { x: 2, y: 1, status: 1 },
    //     { x: 3, y: 1, status: 1 },
    //     { x: 4, y: 1, status: 1 },
    //     { x: 5, y: 1, status: 1 },
    //     { x: 6, y: 1, status: 1 },
    //     { x: 7, y: 1, status: 1 },
    //     { x: 8, y: 1, status: 1 },
    //     { x: 9, y: 1, status: 1 },
    //     { x: 10, y: 1, status: 1 },
    //     { x: 1, y: 2, status: 1 },
    //     { x: 2, y: 2, status: 1 },
    //     { x: 3, y: 2, status: 1 },
    //     { x: 4, y: 2, status: 1 },
    //     { x: 5, y: 2, status: 1 },
    //     { x: 6, y: 2, status: 1 },
    //     { x: 7, y: 2, status: 1 },
    //     { x: 8, y: 2, status: 1 },
    //     { x: 9, y: 2, status: 1 },
    //     { x: 10, y: 2, status: 1 },
    //     { x: 1, y: 3, status: 1 },
    //     { x: 2, y: 3, status: 1 },
    //     { x: 3, y: 3, status: 1 },
    //     { x: 4, y: 3, status: 1 },
    //     { x: 5, y: 3, status: 1 },
    //     { x: 6, y: 3, status: 1 },
    //     { x: 7, y: 3, status: 1 },
    //     { x: 8, y: 3, status: 1 },
    //     { x: 9, y: 3, status: 1 },
    //     { x: 10, y: 3, status: 1 },
    //     { x: 1, y: 4, status: 1 },
    //     { x: 2, y: 4, status: 1 },
    //     { x: 3, y: 4, status: 1 },
    //     { x: 4, y: 4, status: 1 },
    //     { x: 5, y: 4, status: 1 },
    //     { x: 6, y: 4, status: 1 },
    //     { x: 7, y: 4, status: 1 },
    //     { x: 8, y: 4, status: 1 },
    //     { x: 9, y: 4, status: 1 },
    //     { x: 10, y: 4, status: 1 },
    //     { x: 1, y: 5, status: 1 },
    //     { x: 2, y: 5, status: 1 },
    //     { x: 3, y: 5, status: 1 },
    //     { x: 4, y: 5, status: 1 },
    //     { x: 5, y: 5, status: 1 },
    //     { x: 6, y: 5, status: 1 },
    //     { x: 7, y: 5, status: 1 },
    //     { x: 8, y: 5, status: 1 },
    //     { x: 9, y: 5, status: 1 },
    //     { x: 10, y: 5, status: 1 },
    //     { x: 1, y: 6, status: 1 },
    //     { x: 2, y: 6, status: 1 },
    //     { x: 3, y: 6, status: 1 },
    //     { x: 4, y: 6, status: 1 },
    //     { x: 5, y: 6, status: 1 },
    //     { x: 6, y: 6, status: 1 },
    //     { x: 7, y: 6, status: 1 },
    //     { x: 8, y: 6, status: 1 },
    //     { x: 9, y: 6, status: 1 },
    //     { x: 10, y: 6, status: 1 },
    //     { x: 1, y: 7, status: 1 },
    //     { x: 2, y: 7, status: 1 },
    //     { x: 3, y: 7, status: 1 },
    //     { x: 4, y: 7, status: 1 },
    //     { x: 5, y: 7, status: 1 },
    //     { x: 6, y: 7, status: 1 },
    //     { x: 7, y: 7, status: 1 },
    //     { x: 8, y: 7, status: 1 },
    //     { x: 9, y: 7, status: 1 },
    //     { x: 10, y: 7, status: 1 },
    //     { x: 1, y: 8, status: 1 },
    //     { x: 2, y: 8, status: 1 },
    //     { x: 3, y: 8, status: 1 },
    //     { x: 4, y: 8, status: 1 },
    //     { x: 5, y: 8, status: 1 },
    //     { x: 6, y: 8, status: 1 },
    //     { x: 7, y: 8, status: 1 },
    //     { x: 8, y: 8, status: 1 },
    //     { x: 9, y: 8, status: 1 },
    //     { x: 10, y: 8, status: 1 },
    //     { x: 1, y: 9, status: 1 },
    //     { x: 2, y: 9, status: 1 },
    //     { x: 3, y: 9, status: 1 },
    //     { x: 4, y: 9, status: 1 },
    //     { x: 5, y: 9, status: 1 },
    //     { x: 6, y: 9, status: 1 },
    //     { x: 7, y: 9, status: 1 },
    //     { x: 8, y: 9, status: 1 },
    //     { x: 9, y: 9, status: 1 },
    //     { x: 10, y: 9, status: 1 },
    //     { x: 1, y: 10, status: 1 },
    //     { x: 2, y: 10, status: 1 },
    //     { x: 3, y: 10, status: 1 },
    //     { x: 4, y: 10, status: 1 },
    //     { x: 5, y: 10, status: 1 },
    //     { x: 6, y: 10, status: 1 },
    //     { x: 7, y: 10, status: 1 },
    //     { x: 8, y: 10, status: 1 },
    //     { x: 9, y: 10, status: 1 },
    //     { x: 10, y: 10, status: 1 },
    // ]);

	const [baseMap, setBaseMap] = useState(Array(100).fill(0));
	const [ready, setReady] = useState(false);
	const [baseInfo, setBaseInfo] = useState({});
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

			if(data.winner === currentPlayer.id)
			{
				// show winner modal
			} else {
				// show loser modal
			}
		})
    }, []);

	// useEffect(() => {
	// 	console.log(currentPlayer);
	// }, [currentPlayer.inGame]);

    return (
		// currentPlayer !== undefined && currentPlayer.inGame ?
        <div className={classes.grid}>
            {baseMap.map((value, index) => (
                <Checker
                    key={index}
                    coord={index}
					// onClick={() => console.log("test")}
					ship_setted={value == 1 ? "purple" : "gray"}

					callback={() => {
						if(!ready && currentPlayer.inGame === true)
						{
							// console.log("test1");
							socketIO.emit("GameAction", JSON.stringify({
								"state": "prepare",
								"player_turn": baseInfo.player_turn,
								"room_id": baseInfo.room_id,
								"player_id": socketIO.id,
								"ship_set": index
							}), (data) => {
								data = JSON.parse(data);
								// console.log("test2");

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
		// :
		// <div>А вот и не будет игры</div>
    );
};

export default CheckeredFieldOne;
