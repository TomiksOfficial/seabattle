import React from "react";
import classes from "./Player.module.css";
import invited from "../../img/invited.png";
import { useEffect } from "react";
import { socketIO } from "../..";
import { useState } from "react";

const Player = (props) => {

	const [wait, setWait] = useState(false);

	useEffect(() => {
		socketIO.on("InviteRequest", (callback) => {
			// console.log("test ir")
			// const data = JSON.stringify({"accept": true});
			// console.log(data);
			callback({"accept": true});
		})
	}, []);

    return (
		wait === false ?
        <div className={classes.player}>
            <span>{props.nickname}</span>
            <img src={invited} className={classes.invited} onClick={() => {
				setWait(true);

				socketIO.emit("InviteToGame", JSON.stringify({"id_client": props.id}), (data) => {
					data = JSON.parse(data);

					setWait(false);
				})
			}} />
        </div>
		:
		<div>test</div>
    );
};

export default Player;
