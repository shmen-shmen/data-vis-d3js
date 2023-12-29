import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const EvilFace = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		});
		return () => {
			window.removeEventListener("resize", () => {
				setWidth(window.innerWidth);
				setHeight(window.innerHeight);
			});
		};
	});

	const centerX = width / 2;
	const centerY = height / 2;
	const diag = Math.sqrt(centerX ** 2 + centerY ** 2);
	const strokeWidth = 10;
	const eyeOffsetX = centerX * 0.2;
	const eyeOffsetY = centerY * 0.15;
	const rEye = 0.04 * diag;
	const rBlink = 0.025 * diag;

	const [phiLeft, setPhiLeft] = useState(0);
	const [phiRight, setPhiRight] = useState(0);

	useEffect(() => {
		const mouseMoveCallback = (e) => {
			const newPhi = (side) => {
				const eyeElement = document.querySelector(`#${side}Eye`);
				const rect = eyeElement.getBoundingClientRect();
				const eyeCenterX = rect.left + rect.width / 2;
				const eyeCenterY = rect.top + rect.height / 2;
				const movingX = e.clientX;
				const movingY = e.clientY;
				const angleRadians = Math.atan2(
					movingY - eyeCenterY,
					movingX - eyeCenterX
				);
				const normalizedAngle =
					((angleRadians + Math.PI) % (2 * Math.PI)) - Math.PI;
				return normalizedAngle;
			};

			setPhiLeft(newPhi("left"));
			setPhiRight(newPhi("right"));
		};
		document.addEventListener("mousemove", mouseMoveCallback);

		return () => {
			document.removeEventListener("mousemove", mouseMoveCallback);
		};
	});

	const mouthRadius = 0.2 * diag;

	const mouthArc = d3
		.arc()
		.innerRadius(mouthRadius)
		.outerRadius(mouthRadius + strokeWidth)
		.startAngle(Math.PI / 1.8)
		.endAngle(Math.PI * 1.44);

	return (
		<>
			<div className="svg-wrapper">
				<svg width={width} height={height}>
					<g transform={`translate(${centerX}, ${centerY})`}>
						<circle
							r={0.4 * diag - strokeWidth}
							fill="yellow"
							stroke="black"
							strokeWidth={strokeWidth}
						></circle>
						<circle
							id="leftEye"
							cx={-eyeOffsetX}
							cy={-eyeOffsetY}
							r={rEye}
						></circle>
						<circle
							cx={-eyeOffsetX + (rEye - rBlink) * Math.cos(phiLeft)}
							cy={-eyeOffsetY + (rEye - rBlink) * Math.sin(phiLeft)}
							r={rBlink}
							fill="white"
						></circle>
						<circle
							id="rightEye"
							cx={eyeOffsetX}
							cy={-eyeOffsetY}
							r={rEye}
						></circle>
						<circle
							cx={eyeOffsetX + (rEye - rBlink) * Math.cos(phiRight)}
							cy={-eyeOffsetY + (rEye - rBlink) * Math.sin(phiRight)}
							r={rBlink}
							fill="white"
						></circle>
						<path d={mouthArc()} />
					</g>
				</svg>
			</div>
		</>
	);
};

export default EvilFace;
