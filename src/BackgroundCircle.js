import React from "react";

export const BackgroundCircle = ({ radius, stroke }) => {
	return (
		<circle
			r={radius}
			strokeWidth={stroke}
			fill="yellow"
			stroke="black"
		></circle>
	);
};
