import React from "react";
import classes from './EnterNickname.module.css';
import { useState } from "react";

const EnterNickname = ({ active, setActive }) => {

    const [nickname, setNickname] = useState('')
    const [nicknameError, setNicknameError] = useState(false)

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
                    onClick={nicknameError ? () => setActive(false) : () => { }}>
                    <span>Enter</span>
                </button>
            </div>
        </div>
    )
}

export default EnterNickname;