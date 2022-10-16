import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home/Home.js";

export function FreeComponent() {
	// set an initial state for the message we will receive after the API call
	const [message, setMessage] = useState("");

	// useEffect automatically executes once the page is fully loaded
	useEffect(() => {
		// set configurations for the API call here
		const configuration = {
			method: "get",
			url: "http://localhost:5000/home",
		};

		// make the API call
		axios(configuration)
			.then((result) => {
				// assign the message in our result to the message we initialized above
				setMessage(result);
			})
			.catch((error) => {
				error = new Error();
			});
	}, []);

	return <div>{message && <Home head={message.data.heading} para={message.data.message} />}</div>;
}
