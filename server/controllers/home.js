export const getHome = async (req, res) => {
	try {
		let data = { heading: "Welcome to InstiConnect!", message: "Please login to continue." };
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json("Couldn't load homepage :(");
		console.log(err.message);
	}
};
