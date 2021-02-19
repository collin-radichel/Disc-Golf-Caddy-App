import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignItems: "flex-center",
  },
  name: {
    fontSize: 35,
  },
  title: {
    fontSize: "30px",
  },
  flightImage: {
    width: "80px",
    height: "80px",
    borderRadius: "3px",
  },
  discInfo: {
    fontSize: "30px",
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

  const handleShowDetails = (id) => {
    history.push(`/discDetails/${id}`);
  };

  const handleBackToHome = () => {
    history.push("/");
  };

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
            {discSuggestion.flightPattern_id === disc.flight_pattern_id &&
            discSuggestion.discDistance_id === disc.distance_id &&
            discSuggestion.discType_id === disc.type_id ? (
              <Grid item key={disc.id}>
                <Box display="flex">
                  <Box m="auto" className={classes.title}>
                    EXACT MATCH
                  </Box>
                </Box>
                <Card className="card" id="card">
                  <CardContent>
                    <Typography className={classes.name}>
                      {disc.name}
                    </Typography>
                    <img className="cardImage" src={disc.image_path} onClick={() => handleShowDetails(disc.id)}></img>
                  </CardContent>
                  <CardContent display="inline">
                    <Box display="inline-block" m={1}>
                      <Typography className={classes.discInfo}>
                        {disc.distance} ft.
                      </Typography>
                    </Box>
                    <Box display="inline-block" m={1}>
                      <Typography className={classes.discInfo}>
                        {disc.type}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardContent>
                    <Box display="inline-block">
                      <Typography>{disc.flight_pattern}</Typography>
                      <img
                        className={classes.flightImage}
                        src={disc.flight_pattern_image}
                      ></img>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ) : null}
          </>
        );
      })}
      <br />

      {inventory?.map((disc) => {
        return (
          <>
            {discSuggestion.discDistance_id === disc.distance_id + 1 ||
            discSuggestion.discDistance_id === disc.distance_id - 1 ? (
              <Grid item key={disc.id} display="flex">
                <Box display="flex">
                  <Box m="auto" className={classes.title}>
                    SIMILAR DISTANCE
                  </Box>
                </Box>
                <Card className="card" id="card">
                  <CardContent>
                    <Typography className={classes.name}>
                      {disc.name}
                    </Typography>
                    <img className="cardImage" src={disc.image_path} onClick={() => handleShowDetails(disc.id)}></img>
                  </CardContent>
                  <CardContent display="inline">
                    <Box display="inline-block" m={1}>
                      <Typography className={classes.discInfo}>
                        {disc.distance} ft.
                      </Typography>
                    </Box>
                    <Box display="inline-block" m={1}>
                      <Typography className={classes.discInfo}>
                        {disc.type}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardContent>
                    <Box display="inline-block">
                      <Typography>{disc.flight_pattern}</Typography>
                      <img
                        className={classes.flightImage}
                        src={disc.flight_pattern_image}
                      ></img>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ) : null}
          </>
        );
      })}
      <Box>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          BACK TO HOMEPAGE
        </Button>
      </Box>
    </Grid>
  );
}

export default DiscSuggestionResults;
