import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
import Post from "./Post/Post.js";
import useStyles from "../styles.js";
import "../index.css";

export function AuthComponent() {
	const classes = useStyles();
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");
	const [message, setMessage] = useState("");
	useEffect(() => {
		// set configurations for the API call here
		const configuration = {
			method: "get",
			url: "http://localhost:5000/posts",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		// make the API call
		axios(configuration)
			.then((result) => {
				let postsData = [];
				result.data.map((post) => {
					postsData.push(post);
				});
				// assign the message in our result to the message we initialized above
				setMessage(postsData);
			})
			.catch((error) => {
				error = new Error();
			});
	}, []);
	// logout
	const logout = () => {
		// destroy the cookie
		cookies.remove("TOKEN", { path: "/" });
		// redirect user to the landing page
		window.location.href = "/";
	};
	return (
		<div>
			<h2 className={classes.textCenter}>Welcome to InstiConnect</h2>
			<section className={classes.textCenter} id="navigation">
				<a href="/auth/create-post">
					<button type="button">Make new post</button>
				</a>
				<a href="/auth/find-user">
					<button type="button">Search user</button>
				</a>
				<a href="/auth/find-user">
					<button type="button">My Profile</button>
				</a>
				<a href="/auth/find-user">
					<button type="button">Delete account</button>
				</a>
			</section>
			<div className={classes.mainContainer}>
				<h1>Posts</h1>
				<br />
				{message &&
					message.map((post) => {
						return (
							<>
								<Post content={post.desc} creator={post.userId} />
								<br />
							</>
						);
					})}
				{/* logout */}
				<Button type="submit" variant="danger" onClick={() => logout()}>
					Logout
				</Button>
			</div>
		</div>
	);
}
