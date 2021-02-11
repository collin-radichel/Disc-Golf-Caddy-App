import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
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
}));

function Inventory() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "FETCH_INVENTORY" });
  }, []);

  const inventory = useSelector((store) => store.inventory);

  

  const handleInMyBagChange = (id) => {
    dispatch({type: "UPDATE_IN_MY_BAG", payload: id});
    console.log('id', id);
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
        <Grid item key={disc.id} display="flex" alignItems="center">
          <Card className="card" id="card">
            <CardContent>
              <img className="cardImage" src={disc.image_path}></img>
            </CardContent>
            <CardContent>
              <Typography>{disc.name}</Typography>
              {disc.inMyBag ? 
              <FormControlLabel
                name="inMyBag"
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
