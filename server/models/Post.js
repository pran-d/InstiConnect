import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
	{
		username: {
			// type: mongoose.Schema.Types.ObjectId,
			type: String,
			required: true,
		},
		title: {
			type: String,
			min: 1,
			max: 30,
		},
		desc: {
			type: String,
			max: 500,
			min: 1,
		},
		type: {
			type: String,
			enum: ["Question", "Plan", "Recruitments", "General", "Expressive"],
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
