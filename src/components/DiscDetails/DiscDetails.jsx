import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignItems: "flex-center",
  },
  name: {
    fontSize: 50,
  },
  flightNumbers: {
    marginBlockStart: 10,
  },
}));

function DiscDetails(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const discDetails = useSelector((store) => store.discDetails);
  console.log("discDetails", discDetails);

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.margin}
      justify="center"
      alignItems="center"
    >
      {discDetails?.map((disc) => (
        <Grid item key={disc.id} display="flex" alignItems="center">
          <Card className="detailsCard" id="card">
            <CardContent>
              <img className="detailsCardImage" src={disc.image_path}></img>
            </CardContent>
            <Typography className={classes.name}>{disc.name}</Typography>
            <Typography className={classes.type}>{disc.type}</Typography>
            <Typography className={classes.weight}>{disc.weight}(g)</Typography>
            <CardContent display="inline">
              <Box display="inline-block" p={1} m={1}>
                <Typography>Speed</Typography>
                <Typography>{disc.speed}</Typography>
              </Box>
              <Box display="inline-block" p={1} m={1}>
                <Typography>Glide</Typography>
                <Typography>{disc.glide}</Typography>
              </Box>
              <Box display="inline-block" p={1} m={1}>
                <Typography>Turn</Typography>
                <Typography>{disc.turn}</Typography>
              </Box>
              <Box display="inline-block" p={1} m={1}>
                <Typography>Fade</Typography>
                <Typography>{disc.fade}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DiscDetails;
