import React from "react";
import classes from "./NameBox.module.css";
import { useSelector } from "react-redux";

const NameBox = () => {
	const currentPlayer = useSelector(state => state.currentPlayer);

    return (
        <div className={classes.name}>
            <span>Nickname: {currentPlayer.nickname}</span>
        </div>
    );
};

export default NameBox;
