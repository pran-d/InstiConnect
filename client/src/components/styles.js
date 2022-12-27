import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	mainContainer: {
		textAlign: "center",
		width: "60%",
		margin: "auto",
		backgroundColor: "white",
		padding: "3rem",
		borderRadius: "5rem",
	},
	textCenter: {
		textAlign: "center",
	},
	danger: {
		background: "red",
		color: "white",
		borderRadius: "1rem",
		padding: "0.2rem 1rem",
	},
}));
