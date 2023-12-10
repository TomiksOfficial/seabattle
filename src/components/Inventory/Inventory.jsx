import React from "react";
import classes from "./Inventory.module.css";
import Img from "../../img/ship.png";
import { useSelector } from "react-redux";
const Inventory = () => {

    const currentPlayer = useSelector(state => state.currentPlayer);
    return (
    <div className={classes.block}>
        <div className={classes.invent}>
        { (currentPlayer.inGame == true && currentPlayer.player_turn == 0) ? 
        (<span className={classes.uTurn}>Your turn!</span>) : (<span></span>)}
        
        { (currentPlayer.inGame == true && currentPlayer.player_turn == 1) ? 
        (<span className={classes.eTurn}>Enemy's turn!</span>) : (<span></span>)}

        { (currentPlayer.inGame == true && currentPlayer.player_turn == undefined) ?
         (<span className={classes.aTurn}>Arrangement!</span>) : (<span></span>)}
        </div>
        <img src={Img} className={classes.img} />
    </div>
        
    );
};

export default Inventory;
