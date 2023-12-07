import React from "react";
import classes from "./Player.module.css";
import invited from "../../img/invited.png";
import { useEffect } from "react";
import { socketIO } from "../..";
import { useSelector } from "react-redux";

const Player = (props) => {
	const currentPlayer = useSelector(state => state.currentPlayer);

	useEffect(() => {
		socketIO.on("InviteRequest", (data, sck_id) => {
			// console.log("test ir")
			// const data = JSON.stringify({"accept": true});
			// console.log(data);
			// ref.current = callback;
			props.setOpponentName(data);
			props.setOpponentId(sck_id);
			props.setModalJoinTheGame(true);
			// callback({"accept": true});
		});

		socketIO.on("InviteResult", (data) => {
			data = JSON.parse(data);

			props.setModalWaitingResponse(false);
		});
	}, []);

	return (
		<div>
			<div className={classes.player}>
				<span>{props.nickname}</span>
				<img src={invited} className={classes.invited} onClick={() => {
					// setWait(true);
					if(currentPlayer.inGame === true)
					{
						return;
					}

					props.setModalWaitingResponse(true);

					socketIO.emit("InviteToGame", JSON.stringify({ "id_client": props.id }));
				}} />
			</div>
		</div>
	);
};

export default Player;
