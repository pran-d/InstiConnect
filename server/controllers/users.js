import User from "../models/User.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
				return res.status(500).res.json(err);
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
			res.status(200).json("Account has been updated");
		} catch (err) {
			return res.status(500).res.json(err);
		}
	} else return res.status(403).json("You can update only your account!");
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		let data = [];
		users.map((user) => {
			const { password, createdAt, updatedAt, ...other } = user._doc;
			data.push(other);
		});
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		const { password, updatedAt, ...other } = user._doc;
		if (!user) throw { message: "username doesn't exist" };
		res.status(200).json(other);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = await User.findOne({ id: req.params.id });
		!user && res.status(404).json("user not found");

		if (req.body.userId == req.params.id || req.body.isAdmin) {
			try {
				await User.deleteOne({ id: user.id });
				res.status(200).json("deleted successfully!");
			} catch (err) {
				return res.status(500).json(err);
			}
		} else {
			return res.status(403).json("you can only delete your own account!");
		}
	} catch (err) {
		res.status(404);
	}
};

export const connectUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);
			if (!user.connections.includes(req.body.userId)) {
				await user.updateOne({ $push: { requests: req.body.userId } });
			} else {
				res.status(403).json("you are already connected!");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("you can't connect to yourself");
	}
};

export const acceptUser = async (req, res) => {
	try {
		const reqUser = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.userId);
		if (req.body.accept && reqUser.id != currentUser.id) {
			try {
				await reqUser.updateOne({ $push: { connections: currentUser.id } });
				await currentUser.updateOne({ $push: { connections: reqUser.id } });
			} catch (err) {
				res.status(500).json("unable to connect to user!");
			}
		}
	} catch (err) {
		return res.status(403).json(err.message);
	}
};
