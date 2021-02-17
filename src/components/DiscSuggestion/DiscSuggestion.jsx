import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignItems: "flex-center",
  },
  flightImages: {
    boxShadow: "0 4px 6px #291528",
    borderRadius: "5px",
    margin: 5,
    "&:hover": {
      opacity: "70%",
      height: 85,
      width: 85,
      justify: "center",
    },
  },
  headers: {
    textAlign: "center",
    alignItems: "flex-end",
    color: "#FFFFFF",
    fontSize: "35px",
  },
}));

function DiscSuggestion(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const discFlightPatterns = useSelector((store) => store.discFlightPatterns);
  const discTypes = useSelector((store) => store.discTypes);
  const discDistances = useSelector((store) => store.discDistances);

  const [suggestionInput, setSuggestionInput] = useState({
    flightPattern_id: "",
    discDistance_id: "",
    discType_id: "",
  });

  const handleFlightPatternChange = (value) => (event) => {
    console.log("event.target", event.target);
    console.log("value", value);
    setSuggestionInput({ ...suggestionInput, flightPattern_id: value });
  };

  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    setSuggestionInput({
      ...suggestionInput,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleCalulateSuggestion = () => {
      console.log("getting suggestion based on input:", suggestionInput);
      dispatch({type: "GET_DISC_SUGGESTION", payload : suggestionInput});
      setSuggestionInput({
        flightPattern_id: "",
        discDistance_id: 1,
        discType_id: 1,
      });
      Swal.fire({
        position: 'top',
        timerProgressBar: true,
        title: 'Calculating Results...',
        showConfirmButton: false,
        timer: 900
      });
      history.push('/discSuggestionResults');
  }

  useEffect(() => {
    dispatch({ type: "FETCH_DISC_TYPES" });
    dispatch({ type: "FETCH_DISC_DISTANCES" });
    dispatch({ type: "FETCH_DISC_FLIGHT_PATTERNS" });
  }, []);

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.margin}
      justify="center"
      alignItems="center"
    >
        <Typography className={classes.headers}>
        Please Select a type of disc
      </Typography>
      <Grid item>
        <Box display="flex">
          <select
            className={classes.discTypeSelect}
            onChange={handleChange}
            name="discType_id"
          >
            {discTypes?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </Box>
      </Grid>
      <Typography className={classes.headers}>
        Please Select your desired Flight Pattern
      </Typography>
      <Grid item container>
        {discFlightPatterns &&
          discFlightPatterns.map((pattern) => (
            <Grid
              item
              key={pattern.id}
              display="flex"
              xs={4}
            >
              <img
                onClick={handleFlightPatternChange(pattern.id)}
                height="90"
                width="90"
                className={classes.flightImages}
                src={pattern.flight_pattern_image}
              ></img>
            </Grid>
          ))}
      </Grid>
      <br />
      <Grid item>
        <Typography className={classes.headers}>Select desired distance</Typography>
      </Grid>
      <Grid item>
        <Box display="flex">
          <select
            className={classes.discDistanceSelect}
            onChange={handleChange}
            name="discDistance_id"
          >
            {discDistances?.map((distance) => (
              <option key={distance.id} value={distance.id}>
                {distance.distance}
              </option>
            ))}
          </select>
        </Box>
      </Grid>
      <Grid item>
      <Button variant="contained" color="primary" onClick={handleCalulateSuggestion}>CALCULATE SUGGESTION</Button>
      </Grid>
    </Grid>
  );
}

export default DiscSuggestion;
