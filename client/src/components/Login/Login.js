import React from "react";
import { Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import useStyles from "./styles";
import Navbar from "../Navbar/Navbar";

const cookies = new Cookies();
export default function Login() {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, setLogin] = useState(false);

	const handleSubmit = (e) => {
		// prevent the form from refreshing the whole page
		e.preventDefault();
		//set configurations
		const config = {
			method: "post",
			url: "http://localhost:5000/auth/login",
			data: {
				email,
				password,
			},
		};
		axios(config)
			.then((result) => {
				setLogin(true);
				cookies.set("TOKEN", result.data.token, {
					path: "/",
				});
				// redirect user to the auth page
				window.location.href = `/auth/${result.data.username}`;
				// alert("done");
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 400) {
					window.alert("Wrong password!");
				}
				if (err.response.status === 404) {
					window.alert("Invalid email!");
				}
			});
	};

	return (
		<div>
			<Navbar login={true} />
			<div className={classes.mainContainer}>
				<h2 className={classes.textCenter}>Login</h2>
				<Form>
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

					{login ? <p>Loading...</p> : <p>Login failed!</p>}
				</Form>
			</div>
		</div>
	);
}
