import React from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import TokenAuth from "./TokenAuth";

const AuthVerify = (props) => {
	const cookies = new Cookies();
	props.history.listen(() => {
		const token = cookies.get("TOKEN");

		if (token) {
			const decodedJwt = TokenAuth(token);
			if (decodedJwt.exp * 1000 < Date.now()) {
				props.logOut();
			}
		}
	});

	return <div></div>;
};

export default withRouter(AuthVerify);
