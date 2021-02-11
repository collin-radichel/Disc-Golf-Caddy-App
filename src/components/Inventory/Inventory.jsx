import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      alignItems: "flex-center",
    }
  }));


function Inventory() {
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch({ type: "FETCH_INVENTORY" });
      }, []);

  const inventory = useSelector((store) => store.inventory);

  return (
      
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.margin}
      justify="center"
      alignItems="center"
    >
        {inventory?.map((disc) => (
          <Grid item key={disc.id} display="flex" alignItems="center">
              <Card className="card" id="card">
                  <CardContent>
                      <img className="cardImage" ></img>
                  </CardContent>
                  <CardContent>
                  <Typography>{disc.name}</Typography>
                  </CardContent>
              </Card>
          </Grid>
        ))}
      </Grid>
  );
}

export default Inventory;