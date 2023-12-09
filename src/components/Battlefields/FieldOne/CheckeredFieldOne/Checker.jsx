import React from "react";
import classes from './Checker.module.css'

const Checker = (props) => {
    return <div style={{background:props.ship_setted}} onClick={() => props.callback()}></div>;
};
export default Checker;
