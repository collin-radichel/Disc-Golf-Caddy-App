import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      alignItems: "flex-center",
    },
  }));

 

function DiscDetails(props) {


  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const discDetails = useSelector((store) => store.discDetails);
  console.log('discDetails', discDetails)

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
            <p>{disc.name}</p>
        </Grid>
        ))}
    </Grid>
  );
}

export default DiscDetails;
