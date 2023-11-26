import React from "react";
import classes from './JoinTheGame.module.css';
import { useState, useEffect } from "react";
import imgJoin from '../../../img/Join.png';
import imgRefuse from '../../../img/Refuse.png';


const JoinTheGame = ({ active, setActive }) => {

    return (
        <div className={active ? classes.modal : classes.nomodal}>
            <div className={classes.modalContent}>
                <div className={classes.block1}>
                    <span>You have been invited to the battle!</span>
                </div>
                <div className={classes.block2}>
                    {/* Здесь должно быть имя игрока, который пригласил */}
                    <span>Nickname</span>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.join}  onClick={() => {setActive(false)}}>
                        <img src={imgJoin} />
                    </button>
                    <button className={classes.refuse} onClick={() => {setActive(false)}}>
                        <img src={imgRefuse} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JoinTheGame;