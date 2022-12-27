import React from "react";
import "./App.css";
import Cookies from "universal-cookie";
import { Switch, Route } from "react-router-dom";
import { AuthComponent } from "./components/AuthComponent.js";
import { FreeComponent } from "./components/FreeComponent.js";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Container, Col, Row } from "react-bootstrap";
import Register from "./components//Register/Register.js";
import Login from "./components/Login/Login.js";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import CreatePost from "./components/CreatePost/CreatePost";
import EditPost from "./components/CreatePost/EditPost";
import "./index.css";
import { motion } from "framer-motion/dist/framer-motion";

const App = () => {
	const cookies = new Cookies();
	const token = cookies.get("TOKEN");
	return (
		<Container>
			<Row>
				<Col className="text-center">
					<motion.h1
						animate={{ y: 0 }}
						initial={{ y: -100 }}
						transition={{ type: "spring", stiffness: 100 }}
						style={{ textDecoration: "underline white dotted 3px", color: "white" }}>
						InstiConnect - a space for students
					</motion.h1>
				</Col>
			</Row>

			{/* create routes here */}
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/" component={FreeComponent} />
				{/* <ProtectedRoutes
					exact
					path="/auth"
					render={() => {
						<AuthComponent />;
					}}
				/> */}
				<ProtectedRoutes exact path="/auth/edit-post/:id" component={() => <EditPost />} />
				<ProtectedRoutes exact path="/auth/create-post" component={CreatePost} />
				<ProtectedRoutes exact path="/auth/my-profile/:username" component={() => <Profile />} />
				<ProtectedRoutes exact path="/auth/:username" component={() => <AuthComponent />} />
				<ProtectedRoutes exact path="/auth/settings/:username" component={() => <Settings />} />
			</Switch>
		</Container>
	);
};

export default App;
