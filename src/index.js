import React from "react";
import Face from "./Face.js";
import "./style.css";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

const App = () => {
	return (
		<>
			<h1>FUCKFACE</h1>
			<Face />
		</>
	);
};
root.render(<App />);
