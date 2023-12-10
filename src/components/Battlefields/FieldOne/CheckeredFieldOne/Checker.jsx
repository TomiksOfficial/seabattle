import React, { useEffect, useState } from "react";

const Checker = (props) => {

	const [cellStyle, setCellStyle] = useState("");
	
	useEffect(() => {
		switch(props.ship_setted)
		{
			case 0:
				setCellStyle("#D1E9F6");
				break;
			case 1:
				setCellStyle("gray");
				break;
			case 3:
				setCellStyle("#ff6262");
				break;
		}
	}, [props.ship_setted]);

    return <div style={{background: cellStyle}} onClick={() => props.callback()}></div>;
};
export default Checker;
