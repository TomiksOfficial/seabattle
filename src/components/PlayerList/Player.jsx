import React from "react";
import classes from "./Player.module.css";
import invited from "../../img/invited.png";
import { useEffect } from "react";
import { socketIO } from "../..";
import { useState, useRef } from "react";
import JoinTheGame from '../Modal/JoinTheGame/JoinTheGame.jsx';
import WaitingResponse from '../Modal/WaitingResponse/WaitingResponse.jsx';

const Player = (props) => {

	const [wait, setWait] = useState(false);
	const [modalJoinTheGame, setModalJoinTheGame] = useState(false);
	const [modalWaitingResponse, setModalWaitingResponse] = useState(false);
	const [opponentName, setOpponentName] = useState("");
	const [opponentId, setOpponentId] = useState("");

	useEffect(() => {
		socketIO.on("InviteRequest", (data, sck_id) => {
			// console.log("test ir")
			// const data = JSON.stringify({"accept": true});
			// console.log(data);
			// ref.current = callback;
			setOpponentName(data);
			setOpponentId(sck_id);
			setModalJoinTheGame(true);
			// callback({"accept": true});
		});

		socketIO.on("InviteResult", (data) => {
			data = JSON.parse(data);

			setModalWaitingResponse(false);
		});
	}, []);

	return (
		<div>
			<div className={classes.player}>
				<span>{props.nickname}</span>
				<img src={invited} className={classes.invited} onClick={() => {
					// setWait(true);
					setModalWaitingResponse(true);

					socketIO.emit("InviteToGame", JSON.stringify({ "id_client": props.id }))
				}} />
			</div>
			<div>
				<JoinTheGame active={modalJoinTheGame} setActive={setModalJoinTheGame} name={opponentName} id={opponentId} />
				<WaitingResponse active={modalWaitingResponse} setActive={setModalWaitingResponse} />
			</div>
		</div>
	);
};

export default Player;
