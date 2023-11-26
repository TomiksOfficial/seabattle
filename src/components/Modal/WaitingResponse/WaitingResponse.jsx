import React from "react";
import classes from './WaitingResponse.module.css';
import { useState, useEffect } from "react";



const WaitingResponse = ({ active, setActive }) => {

    return (
        <div className={active ? classes.modal : classes.nomodal}>
            <div className={classes.modalContent}>
                <div className={classes.block}>
                    <span>Please wait until the player responds to your request!</span>
                </div>
                <div className={classes.circle}>
                </div>
            </div>
        </div>
    )
}

export default WaitingResponse;