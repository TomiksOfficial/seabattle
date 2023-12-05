import React from "react";
import classes from './WinLose.module.css';
import { useState, useEffect } from "react";
import { socketIO } from "../../..";
import { useDispatch } from "react-redux";

const WinDefeat = ({ active, setActive,gameStatus}) => {

    
    let winLose = gameStatus ? "Victory!" : "Defeat!";

    return (
        <div className={active ? classes.modal : classes.nomodal}>
            <span className={gameStatus ? classes.win : classes.defeat}>
                {winLose}
            </span>
        </div>
    )
}

export default WinDefeat;