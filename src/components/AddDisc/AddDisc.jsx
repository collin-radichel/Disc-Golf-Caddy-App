import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import FlightTakeoffRoundedIcon from "@material-ui/icons/FlightTakeoffRounded";
import SpeedRoundedIcon from "@material-ui/icons/SpeedRounded";
import TextFieldsRoundedIcon from "@material-ui/icons/TextFieldsRounded";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";
import FitnessCenterRoundedIcon from "@material-ui/icons/FitnessCenterRounded";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { StayPrimaryPortraitTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignItems: "flex-center",
  },
  headers: {
    textAlign: "center",
    alignItems: "flex-end",
  },
  discTypeSelect: {
    alignContent: "center",
  },
  slider: {
    width: 200,
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
  saveBtn: {
    "&:hover": {
      backgroundColor: "green",
    },
  },
}));

const marks = [
  {
    value: 1,
    label: "very bad",
  },
  {
    value: 10,
    label: "brand new",
  },
];

function AddDisc() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "FETCH_DISC_TYPES" });
    dispatch({ type: "FETCH_DISC_DISTANCES" });
    dispatch({ type: "FETCH_DISC_FLIGHT_PATTERNS" });
  }, []);

  const discTypes = useSelector((store) => store.discTypes);
  const discDistances = useSelector((store) => store.discDistances);
  const discFlightPatterns = useSelector((store) => store.discFlightPatterns);

  console.log("discFlightPatterns", discFlightPatterns);

  const [newDisc, setNewDisc] = useState({
    name: "",
    image_path: "",
    weight: "",
    discType_id: 1,
    speed: "",
    glide: "",
    turn: "",
    fade: "",
    flightPattern_id: "",
    condition: 1,
    discDistance_id: 1,
    inMyBag: false,
    notes: "",
  });

  const handleChange = (event) => {
    console.log("event", event.target);
    setNewDisc({ ...newDisc, [event.target.name]: event.target.value });
  };

  const handleSliderChange = (event, value) => {
    console.log("event", event.target);
    setNewDisc({ ...newDisc, condition: value });
  };

  const handleInMyBagChange = (event, value) => {
    console.log("event", event.target);
    setNewDisc({ ...newDisc, inMyBag: value });
  };

  const handleFlightPatternChange = (value) => (event) => {
    console.log("event.target", event.target);
    console.log("value", value);
    setNewDisc({ ...newDisc, flightPattern_id: value });
  };

  const handleSubmitForm = () => {
    console.log("saving newDisc", newDisc);
    dispatch({ type: "POST_DISC", payload: newDisc });
    setNewDisc({
      name: "",
      image_path: "",
      weight: "",
      discType_id: 1,
      speed: "",
      glide: "",
      turn: "",
      fade: "",
      flightPattern_id: "",
      condition: 1,
      discDistance_id: 1,
      inMyBag: false,
      notes: "",
    });
  };

  console.log("newDisc:", newDisc);

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      className={classes.margin}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <h3 className={classes.headers}>
          Please fill in each input field
          <br />
          then press SAVE
        </h3>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <TextFieldsRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="nameInput"
            label="Disc Name"
            onChange={handleChange}
            name="name"
          />
        </Box>
      </Grid>
      <br />
      <Grid item>
        <Box display="flex" alignItems="center">
          <PhotoLibraryRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="imageInput"
            label="Image URL"
            onChange={handleChange}
            name="image_path"
          />
        </Box>
      </Grid>
      <br />
      <Grid item>
        <Box display="flex" alignItems="center">
          <FitnessCenterRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="weightInput"
            label="Weight(g)"
            onChange={handleChange}
            name="weight"
          />
        </Box>
      </Grid>
      <br />
      <Grid item>
        <Box display="flex" alignItems="center">
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
      <br />
      <Grid item>
        <h3 className={classes.headers}>Flight Numbers</h3>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <SpeedRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="speedInput"
            label="Speed (1 to 14)"
            onChange={handleChange}
            name="speed"
          />
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <FlightTakeoffRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="glideInput"
            label="Glide (1 TO 7)"
            onChange={handleChange}
            name="glide"
          />
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <ArrowForwardRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="turnInput"
            label="Turn (+1 TO -5)"
            onChange={handleChange}
            name="turn"
          />
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <ArrowBackRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="fadeInput"
            label="Fade (0 TO 5)"
            onChange={handleChange}
            name="fade"
          />
        </Box>
      </Grid>
      <br />

      <Grid item container>
        {discFlightPatterns?.map((pattern) => (
          <Grid item key={pattern.id} display="flex" alignItems="center" xs={4}>
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
        <h3 className={classes.headers}>Condition</h3>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center" className={classes.slider}>
          <Slider
            defaultValue={1}
            step={1}
            marks={marks}
            min={1}
            max={10}
            valueLabelDisplay="on"
            onChangeCommitted={handleSliderChange}
          />
        </Box>
      </Grid>
      <br />
      <Grid item>
        <h3 className={classes.headers}>Distance</h3>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
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
      <br />
      <Grid item>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            name="inMyBag"
            control={<Switch color="primary" />}
            label="InMyBag : "
            labelPlacement="start"
            onChange={handleInMyBagChange}
          />
        </Box>
      </Grid>
      <br />
      <Grid item>
        <Box display="flex" alignItems="center">
          <TextField
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            name="notes"
            onChange={handleChange}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitForm}
            className={classes.saveBtn}
          >
            SAVE
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddDisc;
