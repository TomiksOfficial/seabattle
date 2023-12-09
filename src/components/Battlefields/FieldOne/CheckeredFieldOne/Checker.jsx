import React from "react";

const Checker = (props) => {
    return <div style={{background:props.ship_setted}} onClick={() => props.callback()}></div>;
};
export default Checker;
