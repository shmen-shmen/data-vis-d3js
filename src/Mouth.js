import React from "react";
import { arc } from "d3";

export const Mouth = ({ mouthRadius, strokeWidth }) => {
	const mouthArc = arc()
		.innerRadius(mouthRadius)
		.outerRadius(mouthRadius + strokeWidth)
		.startAngle(Math.PI / 1.8)
		.endAngle(Math.PI * 1.44);

	return <path d={mouthArc()} />;
};
