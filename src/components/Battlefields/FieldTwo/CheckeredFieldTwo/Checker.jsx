import React from "react";

export const Checker = (props) => {

    return <div style={{background: props.ship_attacked}} onClick={() => props.callback()}></div>;
};
