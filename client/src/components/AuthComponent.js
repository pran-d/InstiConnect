import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
import Post from "./Posts/Post/Post.js";
import useStyles from "./styles.js";
import { motion } from "framer-motion/dist/framer-motion";
import "../index.css";

export function AuthComponent() {
	const { username } = useParams();
	const classes = useStyles();
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");
	const [postData, setPostData] = useState("");
	// const [user, setUser] = useState(props.username);

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
				setPostData(postsData);
			})
			.catch((error) => {
				error = new Error();
			});
	});
	// logout
	const logout = () => {
		// destroy the cookie
		cookies.remove("TOKEN", { path: "/" });
		// redirect user to the landing page
		window.location.href = "/";
	};
	const variants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } },
	};
	const navVariants = {
		visible: (i) => ({
			x: 0,
			transition: {
				delay: i * 0.2,
			},
		}),
		hidden: { x: "-100vw" },
	};
	return (
		<div>
			{username === "none" && (
				<div>
					<p>Sorry, couldn't find user. Please login again!</p>
				</div>
			)}
			{!(username === "none") && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
					<motion.h2
						variants={variants}
						initial="hidden"
						animate="visible"
						style={{ color: "#ff8888" }}
						className={classes.textCenter}>
						Welcome to InstiConnect, {username}
					</motion.h2>
					<section className={classes.textCenter} id="navigation">
						<a href={`/auth/${username}`}>
							<motion.button
								variants={navVariants}
								initial="hidden"
								animate="visible"
								custom={2}
								type="button">
								Feed
							</motion.button>
						</a>
						<a href="/auth/create-post">
							<motion.button
								variants={navVariants}
								initial="hidden"
								animate="visible"
								custom={1}
								type="button">
								Make new post
							</motion.button>
						</a>

						<a href={`/auth/my-profile/${username}`}>
							<motion.button
								variants={navVariants}
								initial="hidden"
								animate="visible"
								custom={3}
								type="button">
								My Profile
							</motion.button>
						</a>

						<a href={`/auth/settings/${username}`}>
							<motion.button
								variants={navVariants}
								initial="hidden"
								animate="visible"
								custom={4}
								type="button">
								Settings
							</motion.button>
						</a>

						<motion.button
							variants={navVariants}
							initial="hidden"
							animate="visible"
							custom={5}
							className={classes.danger}
							onClick={() => logout()}>
							Logout
						</motion.button>
					</section>
					<div className={classes.mainContainer}>
						<h1>Posts</h1>
						<br />
						{postData &&
							postData.map((post) => {
								return (
									<motion.div
										variants={variants}
										initial="hidden"
										animate="visible"
										style={{ width: "60%", margin: "auto" }}
										key={post._id}>
										<Post content={post.title} category={post.type} creator={post.username} />
										<br />
									</motion.div>
								);
							})}
						{/* logout */}
						<Button type="submit" variant="outline-danger" onClick={() => logout()}>
							Logout
						</Button>
					</div>
				</motion.div>
			)}
		</div>
	);
}
