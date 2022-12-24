import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Post from "../Posts/Post/Post.js";
import useStyles from "../../styles.js";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion/dist/framer-motion";
import Navbar from "../Navbar/Navbar.js";
import TokenAuth from "../../utils/TokenAuth.js";

export default function Profile() {
	const { username } = useParams();
	const classes = useStyles();
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");
	const [loading, setLoading] = useState(false);
	const [deleted, setDeleted] = useState(0);
	const [postData, setPostData] = useState("");
	const payload = TokenAuth(token);
	const data = { username: payload.username };

	const deletePost = (id) => {
		fetch(`http://localhost:5000/posts/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
			body: JSON.stringify(data),
		}).then(() => {
			console.log("deleted");
			setDeleted(deleted + 1);
		});
	};
	const editPost = (id) => {
		window.location.replace(`/auth/edit-post/${id}`);
	};

	const userPosts = (post) => {
		return post.username === username;
	};

	const variants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } },
	};

	useEffect(() => {
		// set configurations for the API call here
		setLoading(true);
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
				const postsData = [];
				const data = result.data.filter(userPosts);
				data.map((post) => {
					postsData.push(post);
				});
				// assign the message in our result to the message we initialized above
				setPostData(postsData);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error.message);
				if (error.response.status === 401) {
					window.alert("Login expired! Please login again.");
					window.location.replace("/");
				}
			});
	}, [deleted]);

	return (
		<div>
			<div>
				<Navbar username={username} />
				<h2 style={{ color: "#ff8888", fontSize: "1.8rem" }} className={classes.textCenter}>
					<span style={{ fontSize: "1.2rem" }}>username:</span> {username}
				</h2>
				<div className={classes.mainContainer}>
					<h1>My Posts</h1>
					<br />
					{postData.length === 0 && !loading && <div>You haven't posted anything yet!</div>}
					{postData &&
						postData.map((post) => {
							return (
								<motion.div
									variants={variants}
									animate="visible"
									initial="hidden"
									style={{ width: "70%", margin: "auto" }}
									key={post._id}>
									<div style={{ textAlign: "right" }}>
										<Button
											type="submit"
											variant="outline-primary"
											onClick={() => editPost(post._id)}>
											Edit
										</Button>
										<Button
											type="submit"
											variant="outline-danger"
											onClick={() => deletePost(post._id)}>
											Delete
										</Button>
									</div>
									<Post content={post.title} category={post.type} creator={post.username} />
									<br />
								</motion.div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
