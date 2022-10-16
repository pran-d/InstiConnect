import mongoose from "mongoose";

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
