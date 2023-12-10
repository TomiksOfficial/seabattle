import React from "react";
import { useEffect, useState } from "react";

export const Checker = (props) => {

	const [cellStyle, setCellStyle] = useState("");
	
	useEffect(() => {
		switch(props.ship_setted)
		{
			case 0:
				setCellStyle("#FEDEDE");
				break;
			case -1:
				setCellStyle("black");
				break;
			case 3:
				setCellStyle("purple");
				break;
		}
	}, [props.ship_setted]);

    return <div style={{background: cellStyle}} onClick={() => props.callback()}></div>;
};
