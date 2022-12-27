import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.js";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import useStyles from "../CreatePost/styles";
import Cookies from "universal-cookie";

export default function Settings() {
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");
	const { username } = useParams();
	const classes = useStyles();
	const [userdata, setUserdata] = useState("");

	const changePassword = () => {
		let currPass = prompt("Enter current password");
		let newPass = prompt("Enter new password");
		let data = { currentPass: currPass, password: newPass };
		fetch(`http://localhost:5000/users/${userdata}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			body: JSON.stringify(data),
		})
			.then((res) => {
				if (res.status === 200) window.alert("Password updated");
				if (res.status === 401) window.alert("Couldn't change password");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const deleteAccount = () => {
		let password = prompt("Enter password");
		let data = { password: password };
		fetch(`http://localhost:5000/users/${userdata}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			body: JSON.stringify(data),
		})
			.then((res) => {
				console.log(res);
				window.location.replace("/");
				window.alert("Account deleted!");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	useEffect(() => {
		const configuration = {
			method: "get",
			url: `http://localhost:5000/users/user/${username}`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios(configuration).then((result) => {
			setUserdata(result.data._id);
			// console.log(userdata);
		});
	}, []);

	return (
		<div>
			<Navbar username={username} />
			<h2 style={{ color: "#ff8888", fontSize: "1.8rem" }} className={classes.textCenter}>
				<span style={{ fontSize: "1.2rem" }}>username:</span> {username}
			</h2>
			<div className={classes.mainContainer}>
				<h2 className={classes.textCenter} style={{ marginBottom: "2rem" }}>
					Settings
				</h2>
				<div className={classes.textCenter}>
					Change password
					<Button style={{ marginLeft: "30px", width: "150px" }} onClick={changePassword}>
						Change
					</Button>
				</div>
				<br />
				<div className={classes.textCenter}>
					Delete account
					<Button style={{ marginLeft: "50px", width: "150px" }} onClick={deleteAccount}>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
}
