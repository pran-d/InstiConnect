import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
			validate: [isEmail, "Invalid email"],
		},
		password: {
			type: String,
			required: true,
			min: 8,
		},
		connections: {
			type: Array,
			default: [],
		},
		requests: {
			type: Array,
			default: [],
		},
		desc: {
			type: String,
			max: 50,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
			},
		],
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
