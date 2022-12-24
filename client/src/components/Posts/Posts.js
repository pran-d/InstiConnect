import React from "react";
import Post from "./Post/Post.js";
import useStyles from "./styles";

const Posts = () => {
	const classes = useStyles();
	return (
		<>
			<h1 className={classes.actionDiv}>POSTS</h1>
			<Post />
		</>
	);
};

export default Posts;
