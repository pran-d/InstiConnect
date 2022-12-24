import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
	post: {
		margin: "auto",
		backgroundColor: "#f1f1ff",
		border: "solid",
		paddingTop: "10px",
		boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
		transition: "0.3s",
		"&:hover": {
			backgroundColor: "#efefef",
			boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
			cursor: "pointer",
		},
	},
});
