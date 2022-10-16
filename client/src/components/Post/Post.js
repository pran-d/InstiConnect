import React from "react";

const Post = (props) => {
	return (
		<div>
			<h4>{props.content}</h4>
			<p>created by {props.creator}</p>
		</div>
	);
};

export default Post;
