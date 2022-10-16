import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userReg = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});
		// Create token
		const token = jwt.sign({ user_id: newUser._id, email: newUser.email }, process.env.TOKEN_KEY, {
			expiresIn: "2h",
		});
		// save user token
		newUser.token = token;

		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json(error.message);
	}
};

export const Login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			res.status(404).json("user not found");
			return;
		}

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) {
			res.status(400).json("wrong password");
			return;
		}

		//   create JWT token
		const token = jwt.sign(
			{
				userId: user._id,
				userEmail: user.email,
			},
			"RANDOM-TOKEN",
			{ expiresIn: "24h" }
		);
		// save user token
		user.token = token;
		user.save();

		res.status(200).send({ message: `Welcome, ${user.username}`, email: user.email, token });
	} catch (err) {
		return res.status(500).json(err.message);
	}
};

// export const userReg = async (req, res) => {
// 	try {
// 		//generate new password
// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(req.body.password, salt);
// 		//create new user
// 		const newUser = new User({
// 			username: req.body.username,
// 			email: req.body.email,
// 			password: hashedPassword,
// 		});
// 		//save user and respond
// 		const user = await newUser.save();
// 		res.status(200).json(user);
// user.save()
// 	.then((data) => {
// 		res.status(200).json(data);
// 	})
// 	.catch((err) => {
// 		res.json(err.message);
// 	});
// 	} catch (err) {
// 		res.status(500).json(err.message);
// 	}
// }
