import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignItems: "flex-center",
  },
  name: {
    fontSize: 35,
  }
}));

function Inventory() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_INVENTORY" });
  }, []);


  const inventory = useSelector((store) => store.inventory);


  const handleInMyBagChange = (id) => {
    dispatch({type: "UPDATE_IN_MY_BAG", payload: id});
    console.log('id', id);
  }

  const handleShowDetails = (id) => {
      history.push(`/discDetails/${id}`)
  }

  return (
    
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.margin}
      justify="center"
      alignItems="center"
    >
    <Typography>*Tap your disc for more info</Typography>
      {inventory?.map((disc) => (
        <Grid item key={disc.id} display="flex">
          <Card className="card" id="card">
            <CardContent>
              <img className="cardImage" src={disc.image_path} onClick={() => handleShowDetails(disc.id)}></img>
            </CardContent>
            <CardContent>
              <Typography className={classes.name}>{disc.name}</Typography>
              <Typography>
              {disc.weight}(g)
              <br/>
              {disc.type}
              </Typography>
              {disc.inMyBag ? 
              <FormControlLabel
                name="inMyBag"
                checked={true}
                control={<Switch color="secondary" />}
                label="In My Bag : "
                labelPlacement="start"
                onChange={() => handleInMyBagChange(disc.id)}
              />
              : 
              <FormControlLabel
                name="inMyBag"
                control={<Switch color="secondary" />}
                label="Not In My Bag : "
                labelPlacement="start"
                onChange={() => handleInMyBagChange(disc.id)}
              />
              }
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Inventory;
