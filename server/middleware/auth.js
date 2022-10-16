import jwt from "jsonwebtoken";

export default async function (request, response, next) {
	try {
		//   get the token from the authorization header
		const token = await request.headers.authorization.split(" ")[1];
		//check if the token matches the supposed origin
		const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
		// retrieve the user details of the logged in user
		const user = decodedToken;
		// pass the the user down to the endpoints here
		request.user = user;
		// pass down functionality to the endpoint
		next();
	} catch (error) {
		response.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
}
