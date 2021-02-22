import React from "react";
import { Link, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  margin: {
    margin: 0,
    alignItems: "flex-center",
    width: "100%"
  },
  images: {
    objectFit: "fill",
    width: "700px",
    height: "250px"
  }
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.margin}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <img className={classes.images} src="https://i.imgur.com/94udVBh.jpg"></img>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/inventory");
          }}
        >
          Inventory
        </Button>
      </Grid>
      <Grid item>
        <img className={classes.images} src="https://i.imgur.com/udvi5Iu.jpg"></img>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/addDisc");
          }}
        >
          Add Disc
        </Button>
      </Grid>
      <Grid item>
        <img className={classes.images} src="https://i.imgur.com/lloIzSv.jpg"></img>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => {history.push("/discSuggestion")}}>
          Give Me A Suggestion
        </Button>
      </Grid>
    </Grid>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
