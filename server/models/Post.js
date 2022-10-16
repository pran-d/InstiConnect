import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
	{
		// postId: {
		// 	type: String,
		// 	required: true,
		// },
		userId: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			max: 500,
			min: 1,
		},
		type: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
