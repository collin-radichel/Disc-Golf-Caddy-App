import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Dashboard() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid>
          <Button variant="contained" color="primary">
            Inventory
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push("/addDisc");
            }}
          >
            Add Disc
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" color="secondary">
            Give Suggestion
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
