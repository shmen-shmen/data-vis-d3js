import React, { useState, useEffect } from "react";

import { BackgroundCircle } from "./BackgroundCircle";
import { Eyes } from "./Eyes";
import { Mouth } from "./Mouth";

const Face = () => {
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
	const backgroundRadius = 0.4 * diag - strokeWidth;
	const eyeOffsetX = centerX * 0.2;
	const eyeOffsetY = centerY * 0.15;
	const rEye = 0.04 * diag;
	const rPupil = 0.025 * diag;
	const mouthRadius = 0.2 * diag;

	return (
		<>
			<div className="svg-wrapper">
				<svg width={width} height={height}>
					<g transform={`translate(${centerX}, ${centerY})`}>
						<BackgroundCircle radius={backgroundRadius} stroke={strokeWidth} />
						<Eyes
							eyeOffsetX={eyeOffsetX}
							eyeOffsetY={eyeOffsetY}
							rEye={rEye}
							rPupil={rPupil}
						/>
						<Mouth mouthRadius={mouthRadius} strokeWidth={strokeWidth} />
					</g>
				</svg>
			</div>
		</>
	);
};

export default Face;
