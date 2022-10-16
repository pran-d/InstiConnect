import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { AuthComponent } from "./components/AuthComponent.js";
import { FreeComponent } from "./components/FreeComponent.js";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Container, Col, Row } from "react-bootstrap";
import Register from "./components//Register/Register.js";
import Login from "./components/Login/Login.js";
// import CreatePost from "./components/CreatePost.js";
import "./index.css";

const App = () => {
	return (
		<Container>
			<Row>
				<Col className="text-center">
					<h1>InstiConnect - a space for students</h1>

					<section id="navigation">
						<a href="/">Home</a>
						<a href="/login">Login</a>
						<a href="/register">Register</a>
						<a href="/auth">Feed</a>
					</section>
				</Col>
			</Row>

			{/* create routes here */}
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/" component={FreeComponent} />
				<ProtectedRoutes exact path="/auth" component={AuthComponent} />
				{/* <ProtectedRoutes exact path="/auth/create-post" component={CreatePost} /> */}
			</Switch>
		</Container>
	);
};

export default App;
