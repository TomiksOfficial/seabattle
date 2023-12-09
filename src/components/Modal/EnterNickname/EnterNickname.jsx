import React from "react";
import classes from './EnterNickname.module.css';
import { useState, useEffect } from "react";
import { socketIO } from "../../..";
import { useDispatch } from "react-redux";
import { setActivePlayers } from "../../../store/mainData";
import { setCurrentPlayer } from "../../../store/currentPlayer";

const EnterNickname = ({ active, setActive }) => {

    const [nickname, setNickname] = useState('')
    const [nicknameError, setNicknameError] = useState(false)
    const dispatch = useDispatch();

    const nicknameHandler = (e) => {
        setNickname(e.target.value)
        if (String(e.target.value) != '') {
            setNicknameError(true);
        }
        else {
            setNicknameError(false);
        }
    }

    return (
        <div className={active ? classes.modal : classes.nomodal}>
            <div className={classes.modalContent}>
                <div className={classes.block1}>
                    <span>Please enter your nickname to join the game!</span>
                </div>
                <div className={classes.block2}>
                    <span>Nickname:</span>
                    <input
                        onChange={e => nicknameHandler(e)}
                        type="text"
                        maxLength={9}
                        className="input"
                        value={nickname}>
                    </input>
                </div>
                <button
                    className={nicknameError ? classes.buttonYES : classes.buttonNO}
                    onClick={nicknameError ? (
                        () => {
                            socketIO.emit("AddNewUser", JSON.stringify({ "nickname": nickname }), (data) => {
                                data = JSON.parse(data); // <- объект

                                // console.log(data[socketIO.id]);
                                // console.log(socketIO.id);

                                dispatch(setActivePlayers(data));
                                dispatch(setCurrentPlayer(data[socketIO.id]));
                            });
                            setActive(false);
                        }
                    ) : () => { }}>
                    <span>Enter</span>
                </button>
            </div>
        </div>
    )
}

export default EnterNickname;