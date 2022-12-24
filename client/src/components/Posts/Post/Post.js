import React from "react";
import useStyles from "../styles.js";

const Post = (props) => {
	const classes = useStyles();
	return (
		<div style={{ padding: "10px", border: "solid 1px black", borderRadius: "10px" }} className={classes.post}>
			<h4>
				{props.content}
				<span style={{ color: "#555555", fontSize: "0.8rem" }}>({props.category})</span>
			</h4>
			<p>
				created by <span style={{ fontWeight: "bold", color: "rgb(200,100,100)" }}>{props.creator}</span>
			</p>
		</div>
	);
};

export default Post;
