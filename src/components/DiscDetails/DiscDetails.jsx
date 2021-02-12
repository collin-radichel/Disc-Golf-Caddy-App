import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
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
    fontSize: 20
  },
  condition: {
    fontSize: 20,
  },
  type: {
    fontSize: 20,
  },
  weight: {
    fontSize: 20,
  },
  flight_pattern: {
    fontSize: 25,
    textDecoration: "underline",
  },
  flight_pattern_image: {
    borderRadius: 5,
  },
  notesBox: {
    border: "solid",
    borderColor: theme.palette.secondary.main,
    borderRadius: "5px",
  },
  editBtn: {
    padding: 5,
  },
  deleteBtn: {
    padding: 5,
    backgroundColor: "#b21e35",
    "&:hover": {
      backgroundColor: "#e01e37",
    },
  },
}));

function DiscDetails(props) {


  useEffect(()=> {
    dispatch({type: "FETCH_DISC_DETAILS", payload: id})
  }, []);

  let {id} = useParams();
  console.log('id:', id)
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const discDetails = useSelector((store) => store.discDetails);
  console.log("discDetails", discDetails);

  const handleBackToInventory = () => {
    history.push("/inventory");
  };

  const handleEditDisc = () => {
  
    history.push(`/editDisc/${id}`);
  };

  const handleDeleteDisc = () => {

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
        <Grid item key={discDetails.id} display="flex" alignItems="center">
          <Card className="detailsCard" id="card">
            <CardContent>
              <img className="detailsCardImage" src={discDetails.image_path}></img>
            </CardContent>
            <Typography className={classes.name}>{discDetails.name}</Typography>
            <Typography className={classes.type}>{discDetails.type}</Typography>
            <Typography className={classes.weight}>{discDetails.weight}(g)</Typography>
            <CardContent display="inline" >
              <Box display="inline-block" p={1} m={1}>
                <Typography >Speed</Typography>
                <Typography className={classes.flightNumbers}>{discDetails.speed}</Typography>
              </Box>
              <Box display="inline-block" p={1} m={1}>
                <Typography>Glide</Typography>
                <Typography className={classes.flightNumbers}>{discDetails.glide}</Typography>
              </Box>
              <Box display="inline-block" p={1} m={1}>
                <Typography>Turn</Typography>
                <Typography className={classes.flightNumbers}>{discDetails.turn}</Typography>
              </Box>
              <Box display="inline-block" p={1} m={1}>
                <Typography>Fade</Typography>
                <Typography className={classes.flightNumbers}>{discDetails.fade}</Typography>
              </Box>
            </CardContent>
            <CardContent>
              <Box>
                <Typography className={classes.condition}>
                  Condition: {discDetails.condition}/10
                </Typography>
              </Box>
            </CardContent>
            <CardContent>
              <Box>
                <Typography className={classes.flight_pattern}>
                  Flight Pattern
                </Typography>
                <Typography>{discDetails.flight_pattern}</Typography>
                <img
                  className={classes.flight_pattern_image}
                  src={discDetails.flight_pattern_image}
                ></img>
              </Box>
            </CardContent>
            <CardContent>
              <Box className={classes.notesBox}>
                <Typography>Notes:</Typography>
                <br />
                <Typography>{discDetails.notes}</Typography>
              </Box>
            </CardContent>
            <CardContent>
              <Box display="inline-block" p={1} m={2}>
                <Button startIcon={<EditRoundedIcon />} className={classes.editBtn} variant="contained" color="secondary" onClick={handleEditDisc}>
                  EDIT
                </Button>
              </Box>
              <Box display="inline-block" p={1} m={2}>   
                <Button startIcon={<DeleteForeverRoundedIcon />} className={classes.deleteBtn} variant="contained" onClick={handleDeleteDisc}>
                  DELETE
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToInventory}
        >
          BACK TO INVENTORY
        </Button>
      </Box>
    </Grid>
  );
}

export default DiscDetails;
