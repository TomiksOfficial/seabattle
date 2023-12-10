import React from "react";
import { useEffect, useState } from "react";

export const Checker = (props) => {

	const [cellStyle, setCellStyle] = useState("");
	
	useEffect(() => {
		switch(props.ship_attacked)
		{
			case 0:
				setCellStyle("#FEDEDE");
				break;
			case -1:
				setCellStyle("#62d66a");
				break;
			case 3:
				setCellStyle("#ffffff");
				break;
		}
	}, [props.ship_attacked]);

    return <div style={{background: cellStyle}} onClick={() => props.callback()}></div>;
};
