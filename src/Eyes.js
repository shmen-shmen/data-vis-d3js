import React, { useState, useEffect, useRef } from "react";

export const Eyes = ({ eyeOffsetX, eyeOffsetY, rEye, rPupil }) => {
	const [phiLeft, setPhiLeft] = useState(0);
	const [phiRight, setPhiRight] = useState(0);
	const leftEye = useRef(null);
	const rightEye = useRef(null);

	useEffect(() => {
		const mouseMoveCallback = (e) => {
			const newPhi = (side) => {
				const eyeElement = side ? leftEye.current : rightEye.current;
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
			setPhiLeft(newPhi(true));
			setPhiRight(newPhi(false));
		};

		document.addEventListener("mousemove", mouseMoveCallback);

		return () => {
			document.removeEventListener("mousemove", mouseMoveCallback);
		};
	});

	return (
		<>
			<circle ref={leftEye} cx={-eyeOffsetX} cy={-eyeOffsetY} r={rEye}></circle>
			<circle
				cx={-eyeOffsetX + (rEye - rPupil) * Math.cos(phiLeft)}
				cy={-eyeOffsetY + (rEye - rPupil) * Math.sin(phiLeft)}
				r={rPupil}
				fill="white"
			></circle>
			<circle ref={rightEye} cx={eyeOffsetX} cy={-eyeOffsetY} r={rEye}></circle>
			<circle
				cx={eyeOffsetX + (rEye - rPupil) * Math.cos(phiRight)}
				cy={-eyeOffsetY + (rEye - rPupil) * Math.sin(phiRight)}
				r={rPupil}
				fill="white"
			></circle>
		</>
	);
};
