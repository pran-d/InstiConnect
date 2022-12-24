import React from "react";
import Navbar from "../Navbar/Navbar.js";
import { useParams } from "react-router-dom";

export default function Settings() {
	const { username } = useParams();
	return (
		<div>
			<Navbar username={username} />
		</div>
	);
}
