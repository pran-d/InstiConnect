import axios from "axios";

const url = "http://localhost:5000/users";

const Hol = async () => {
	const res = await axios.get(url);
	console.log(res);
	return (
		<>
			<div>Hello, {res[0].username}</div>
		</>
	);
};

export default Hol;
