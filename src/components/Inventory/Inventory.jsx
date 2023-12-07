import React from "react";
import classes from "./Inventory.module.css";
import Img from "../../img/ship.png";
import { useSelector } from "react-redux";

const Inventory = () => {

	const currentPlayer = useSelector(state => state.currentPlayer);

    return (
        <div className={classes.invent}>
            <div>
                <img src={Img} className={classes.img} />
				<span>{currentPlayer.player_turn}</span>
            </div>
        </div>
    );
};

export default Inventory;
