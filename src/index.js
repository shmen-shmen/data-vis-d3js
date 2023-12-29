import React from "react";
import Face from "./Face.js";
import EvilFace from "./EvilFace.js";
import "./style.css";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

const App = () => {
	return (
		<div id="app">
			{/* <Face /> */}
			<EvilFace />
		</div>
	);
};
root.render(<App />);
