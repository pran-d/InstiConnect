import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import useStyles from "./styles";
import Cookies from "universal-cookie";
import TokenAuth from "../../utils/TokenAuth.js";
import Navbar from "../Navbar/Navbar.js";
//tobechanged

const cookies = new Cookies();
export default function CreatePost() {
	const classes = useStyles();
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [type, setType] = useState("");
	const [post, setPost] = useState(false);
	const token = cookies.get("TOKEN");
	const payload = TokenAuth(token);

	const handleSubmit = (e) => {
		// prevent the form from refreshing the whole page
		e.preventDefault();
		//set configurations
		const config = {
			method: "post",
			url: "http://localhost:5000/posts",
			data: {
				title,
				username: payload.username,
				type,
				desc,
			},
			headers: {
				Authorization: `Basic ${token}`,
			},
		};
		axios(config)
			.then((result) => {
				setPost(true);
				// redirect user to the home page
				window.location.href = `/auth/${payload.username}`;
				alert("done");
			})
			.catch((error) => {
				console.log(error.message);
				if (error.response.status === 401) {
					window.alert("Couldn't post. Login expired!");
					//window.location.replace("/");
				}
			});
	};

	return (
		<div>
			<Navbar username={payload.username} />
			<h2 style={{ color: "#ff8888", fontSize: "1.8rem" }} className={classes.textCenter}>
				<span style={{ fontSize: "1.2rem" }}>username:</span> {payload.username}
			</h2>
			<div className={classes.mainContainer}>
				<h2 className={classes.textCenter}>Create Post</h2>
				<Form>
					{/* title */}
					<Form.Group controlId="formBasicTitle">
						<Form.Label>Post Title</Form.Label>
						<Form.Control
							type="title"
							placeholder="Enter title"
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>

					{/* Description */}
					<Form.Group controlId="formBasicDesc">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							type="desc"
							placeholder="desc"
							name="desc"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</Form.Group>

					{/* type */}
					<Form.Group controlId="formBasicType">
						<Form.Label>Type</Form.Label>
						<Form.Select type="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
							<option value="General">General</option>
							<option value="Plan">Plan</option>
							<option value="Question">Question</option>
							<option value="Recruitments">Recruitment/Call for members</option>
							<option value="Expressive">Expressive Media</option>
						</Form.Select>
					</Form.Group>

					{/* submit button */}
					<div className={classes.topPadding}>
						<Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
							Submit
						</Button>
					</div>

					{post ? <p>Posting...</p> : <p>Post failed!</p>}
				</Form>
			</div>
		</div>
	);
}
