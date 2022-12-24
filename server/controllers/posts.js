import Post from "../models/Post.js";

// const authHeader = () => {
// 	const user = JSON.parse(localStorage.getItem("user"));

// 	if (user && user.accessToken) {
// 		// for Node.js Express back-end
// 		return { "x-access-token": user.accessToken };
// 	} else {
// 		return {};
// 	}
// };

export const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;
	const newPost = new Post(post);
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const editPost = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });
	!post && res.status(404).json("Post doesn't exist!");
	if (post.username !== req.body.username) {
		return res.status(403).json("you can only edit your own posts");
	} else {
		try {
			await Post.updateOne(
				{ _id: req.params.id },
				{ $set: { title: req.body.title, desc: req.body.desc, type: req.body.type } }
			);
			res.status(201).json("successfully edited");
		} catch (err) {
			res.status(409).json({ message: err.message });
		}
	}
};

export const deletePost = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });
	!post && res.status(404).json("Post doesn't exist!");
	if (post.username === req.body.username) {
		try {
			await Post.deleteOne({ _id: req.params.id });
			res.status(201).json("successfully deleted");
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	} else {
		return res.status(403).json("you can only delete your own posts");
	}
};

export const getTimeline = async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendPosts = await Promise.all(
			currentUser.connections.map((friendId) => {
				Post.find({ userId: friendId });
			})
		);
		res.json(userPosts.concat(...friendPosts));
	} catch (err) {
		res.status(500).json(err);
	}
};

export const getPosts = async (req, res) => {
	try {
		const post = await Post.find();
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
