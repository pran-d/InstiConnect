import React from "react";
import { useParams } from "react-router-dom";

export default function Profile(props) {
	return (
		<>
			<div className="username">
				<h2>Hello, {props.username}!</h2>
			</div>
		</>
	);
}
