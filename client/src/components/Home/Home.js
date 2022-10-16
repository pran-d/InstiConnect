import React from "react";
import useStyles from "../../styles.js";

const Home = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.mainContainer}>
			<h4>{props.head}</h4>
			<p>{props.para}</p>
			<a href="/login">
				<button type="button">Login</button>
			</a>
			<p>
				<br />
				Don't have an account?
			</p>
			<button>Register</button>
		</div>
	);
};

export default Home;

// import React from "react";
// import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

// import Posts from "../Posts/Posts.js";
// import useStyles from "../../styles";

// import activities from "../../images/activities.png";

// const Home = () => {
// 	const classes = useStyles();
// 	return (
// 		<Container maxwidth="lg">
// 			<AppBar className={classes.appBar} position="static" color="inherit">
// 				<Typography className={classes.heading} variant="h2" align="center">
// 					Activities
// 				</Typography>
// 				<img className={classes.image} src={activities} alt="activities" height={60} />
// 			</AppBar>
// 			<Grow in>
// 				<Container>
// 					<Grid container justify="space-between" alignItems="stretch" spacing={3}>
// 						<Grid item xs={12} sm={7}>
// 							<Posts />
// 						</Grid>
// 						<Grid item xs={12} sm={4}></Grid>
// 					</Grid>
// 				</Container>
// 			</Grow>
// 		</Container>
// 	);
// };

// export default Home;
