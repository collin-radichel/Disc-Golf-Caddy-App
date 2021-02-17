import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignItems: "flex-center",
  },
  name: {
    fontSize: 35,
  },
}));

function DiscSuggestionResults() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_INVENTORY" });
  }, []);

  const discSuggestion = useSelector((store) => store.discSuggestion);
  const inventory = useSelector((store) => store.inventory);

  console.log("discSuggestion:", discSuggestion);
  console.log("inventory:", inventory);

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.margin}
      justify="center"
      alignItems="center"
    >
      {inventory?.map((disc) => {
          return (
              <>
        {discSuggestion.flightPattern_id === disc.flight_pattern_id
            && discSuggestion.discDistance_id === disc.distance_id
            && discSuggestion.discType_id === disc.type_id ? 
          <Grid item key={disc.id} display="flex">
              <Typography color="primary">Exact Match!</Typography>
          <Card className="card" id="card">
            <CardContent>
                <Typography className={classes.name}>{disc.name}</Typography>
              <img className="cardImage" src={disc.image_path}></img>
            </CardContent>
          </Card>
          </Grid>
         :
          null
        }
        </>
    )})}
    <br/>

    {inventory?.map((disc) => {
          return (
              <>
        {discSuggestion.discDistance_id === disc.distance_id + 1
            || discSuggestion.discDistance_id === disc.distance_id - 1 ? 
          <Grid item key={disc.id} display="flex">
              <Typography color="primary">Close!</Typography>
          <Card className="card" id="card">
            <CardContent>
                <Typography className={classes.name}>{disc.name}</Typography>
              <img className="cardImage" src={disc.image_path}></img>
            </CardContent>
          </Card>
          </Grid>
         :
          null
        }
        </>
    )})}

    </Grid>
  );
}

export default DiscSuggestionResults;
