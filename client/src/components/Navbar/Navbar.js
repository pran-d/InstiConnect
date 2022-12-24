import React from "react";
import useStyles from "../../styles.js";

export default function Navbar(props) {
	const classes = useStyles();
	const username = props.username;
	return (
		<section className={classes.textCenter} id="navigation">
			<a href={`/auth/${username}`}>
				<button type="button">Feed</button>
			</a>
			<a href="/auth/create-post">
				<button type="button">Make new post</button>
			</a>
			<a href={`/auth/my-profile/${username}`}>
				<button type="button">My Profile</button>
			</a>
			<a href={`/auth/settings/${username}`}>
				<button type="button">Settings</button>
			</a>
		</section>
	);
}
