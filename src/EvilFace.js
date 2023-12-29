import React, { useState, useEffect } from "react";
import * as d3 from "d3";

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

	// face
	const diag = Math.sqrt(centerX ** 2 + centerY ** 2);
	const faceWidth = diag / 2;
	const faceHeight = diag / 3.5;
	const faceCenterX = centerX - 0.5 * faceWidth;
	const faceCenterY = centerY - 0.8 * faceHeight;

	// eye
	const eyeWidth = faceWidth * 0.35;
	const eyeHeight = faceHeight * 0.35;
	const eyeCenterX = centerX - 0.5 * eyeWidth;
	const eyeCenterY = centerY - 0.8 * eyeHeight;
	const eyeOffsetX = -faceWidth * 0.3;
	const eyeOffsetY = -faceHeight * 0.3;

	// blink
	const rEye = eyeHeight / 4.2;
	const blinkWidth = eyeWidth / 3;
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

	//teeth
	const toothWidth = faceWidth / 11;
	const toothHeight = faceHeight / 3;
	const teethGap = toothWidth / 2.5;
	const toothX1 = faceCenterX;
	const toothX2 = faceCenterX + (teethGap + toothWidth);
	const toothX3 = faceCenterX + (teethGap + toothWidth) * 2;
	const toothX4 = faceCenterX + (teethGap + toothWidth) * 3;
	const toothYTop = faceCenterY + faceHeight;
	const toothYBot = faceCenterY + faceHeight + toothHeight + teethGap;

	const Tooth = ({ X, Y }) => {
		return (
			<rect
				x={X}
				y={Y}
				width={toothWidth}
				height={toothHeight}
				fill="white"
				stroke="black"
				strokeWidth={10}
			></rect>
		);
	};

	const [mouthOpen, setMouthOpen] = useState(true);

	useEffect(() => {
		const mouseDownCallbak = () => {
			setMouthOpen(false);
			setTimeout(() => {
				setMouthOpen(true);
			}, 100);
		};
		document.addEventListener("mousedown", mouseDownCallbak);
		return () => {
			document.removeEventListener("mousedown", mouseDownCallbak);
		};
	});

	return (
		<>
			<div className="svg-wrapper">
				<svg width={width} height={height}>
					<rect
						x={faceCenterX}
						y={faceCenterY}
						width={faceWidth}
						height={faceHeight}
						fill="white"
						stroke="black"
						strokeWidth={10}
					></rect>
					<rect
						id="leftEye"
						x={eyeCenterX + eyeOffsetX}
						y={eyeCenterY + eyeOffsetY}
						width={eyeWidth}
						height={eyeHeight}
						transform={`
						rotate(10, ${centerX}, ${centerY}) 
						translate(0, ${0.2 * eyeHeight})`}
					></rect>
					<rect
						id="leftBlink"
						x={eyeCenterX + eyeOffsetX + rEye * Math.cos(phiLeft)}
						y={eyeCenterY + eyeOffsetY + rEye * Math.sin(phiLeft)}
						width={blinkWidth}
						height={blinkWidth}
						fill="red"
						transform={`translate(${0.5 * (eyeWidth - blinkWidth)}, ${
							0.5 * (eyeHeight - blinkWidth)
						})`}
					></rect>
					<rect
						id="rightEye"
						x={eyeCenterX - eyeOffsetX}
						y={eyeCenterY + eyeOffsetY}
						width={eyeWidth}
						height={eyeHeight}
						transform={`rotate(-10, ${centerX}, ${centerY}) 	translate(0, ${
							0.2 * eyeHeight
						})`}
					></rect>
					<rect
						id="rightBlink"
						x={eyeCenterX - eyeOffsetX + rEye * Math.cos(phiRight)}
						y={eyeCenterY + eyeOffsetY + rEye * Math.sin(phiRight)}
						width={blinkWidth}
						height={blinkWidth}
						fill="red"
						transform={`translate(${0.5 * (eyeWidth - blinkWidth)}, ${
							0.5 * (eyeHeight - blinkWidth)
						})`}
					></rect>
					<g id="mouth" width={100} height={100} fill="aqua">
						<g transform={`translate(${faceWidth / 4}, 0)`}>
							<Tooth X={toothX1} Y={toothYTop} />
							<Tooth X={toothX2} Y={toothYTop} />
							<Tooth X={toothX3} Y={toothYTop} />
							<Tooth X={toothX4} Y={toothYTop} />
						</g>
						<g
							className="lowerJaw"
							transform={`translate(${faceWidth / 4}, ${mouthOpen ? 10 : 0})`}
						>
							<Tooth X={toothX1} Y={toothYBot} />
							<Tooth X={toothX2} Y={toothYBot} />
							<Tooth X={toothX3} Y={toothYBot} />
							<Tooth X={toothX4} Y={toothYBot} />
						</g>
					</g>
				</svg>
			</div>
		</>
	);
};

export default Face;
