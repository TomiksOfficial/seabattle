import React from "react";
import classes from './JoinTheGame.module.css';
import { useState, useEffect } from "react";
import imgJoin from '../../../img/join.png';
import imgRefuse from '../../../img/Refuse.png';
import { socketIO } from "../../..";


const JoinTheGame = ({ active, setActive, name, id }) => {

    return (
        <div className={active ? classes.modal : classes.nomodal}>
            <div className={classes.modalContent}>
                <div className={classes.block1}>
                    <span>You have been invited to the battle!</span>
                </div>
                <div className={classes.block2}>
                    {/* Здесь должно быть имя игрока, который пригласил */}
                    <span>{name}</span>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.join}  onClick={() => {
						setActive(false);
						socketIO.emit("InviteAccept", {"id_client": id, "accept": true});
						// callback({"accept": true});
					}}>
                        <img src={imgJoin} />
                    </button>
                    <button className={classes.refuse} onClick={() => {
						setActive(false);
						socketIO.emit("InviteAccept", {"id_client": id, "accept": false});
						// callback({"accept": false});
					}}>
                        <img src={imgRefuse} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JoinTheGame;