import React from "react";
import useStyles from "../../styles.js";
import "./styles.css";
import { motion } from "framer-motion/dist/framer-motion";

const Home = (props) => {
	const variantsLeft = {
		visible: { x: 0, transition: { type: "spring", stiffness: 50 } },
		hidden: { x: "-100vw" },
		whileHover: { scale: 1.15 },
	};
	const variantsRight = {
		visible: { x: 0, transition: { type: "spring", stiffness: 50 }, whileHover: { scale: 1.1 } },
		hidden: { x: "100vw" },
		whileHover: { scale: 1.15 },
	};
	const classes = useStyles();
	return (
		<div className={`${classes.mainContainer} white-bg`}>
			<h4>{props.head}</h4>
			<p>{props.para}</p>
			<motion.div variants={variantsLeft} initial="hidden" animate="visible" whileHover="whileHover">
				<a href="/login" className="login">
					<button>Login</button>
				</a>
			</motion.div>
			<p>
				<br />
				Don't have an account?
			</p>
			<motion.div variants={variantsRight} initial="hidden" animate="visible" whileHover="whileHover">
				<a href="/register" className="register">
					<button>Register</button>
				</a>
			</motion.div>
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
