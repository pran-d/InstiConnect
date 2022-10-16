import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import useStyles from "./styles";

export default function Register() {
	const classes = useStyles();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [register, setRegister] = useState(false);

	const handleSubmit = (e) => {
		// prevent the form from refreshing the whole page
		e.preventDefault();
		//set configurations
		const config = {
			method: "post",
			url: "http://localhost:5000/auth/register",
			data: {
				email,
				username,
				password,
			},
		};
		axios(config)
			.then((result) => {
				setRegister(true);
			})
			.catch((err) => {
				err = new Error();
			});
	};

	return (
		<div className={classes.mainContainer}>
			<h2 className={classes.textCenter}>Register</h2>
			<Form onSubmit={(e) => handleSubmit(e)}>
				{/* email */}
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				{/* username */}
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="username"
						placeholder="Enter username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>

				{/* password */}
				<Form.Group controlId="formBasicPasseord">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				{/* submit button */}
				<div className={classes.topPadding}>
					<Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
						Submit
					</Button>
				</div>

				{register ? <p>You are registered successfully!</p> : <p>You are not registered</p>}
			</Form>
		</div>
	);
}
