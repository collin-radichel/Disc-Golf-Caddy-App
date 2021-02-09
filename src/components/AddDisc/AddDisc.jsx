import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from '@material-ui/core/Slider';
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import FlightTakeoffRoundedIcon from "@material-ui/icons/FlightTakeoffRounded";
import SpeedRoundedIcon from "@material-ui/icons/SpeedRounded";
import TextFieldsRoundedIcon from "@material-ui/icons/TextFieldsRounded";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";
import FitnessCenterRoundedIcon from "@material-ui/icons/FitnessCenterRounded";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(10),
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
      width: 200
  }
}));

const marks = [
    {
      value: 1,
      label: 'very bad',
    },
    {
      value: 10,
      label: 'brand new',
    },
  ];

function AddDisc() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "FETCH_DISC_TYPES" });
  }, []);

  const discTypes = useSelector((store) => store.type);
  const [newDisc, setNewDisc] = useState({
    name: "",
    image: "",
    weight: "",
    discType: "",
    speed: "",
    glide: "",
    turn: "",
    fade: "",
    condition: "",
  });

  const handleChange = (event) => {
    setNewDisc({ ...newDisc, [event.target.name]: event.target.value });
  };

  console.log("newDisc:", newDisc);

  return (
    <div>
      <div className={classes.margin}>
        <h3 className={classes.headers}>
          Please fill in each input field
          <br />
          then press SAVE
        </h3>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextFieldsRoundedIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <TextField
              id="nameInput"
              label="Disc Name"
              onChange={handleChange}
              name="name"
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PhotoLibraryRoundedIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <TextField
              id="imageInput"
              label="Image URL"
              onChange={handleChange}
              name="image"
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <FitnessCenterRoundedIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <TextField
              id="weightInput"
              label="Weight(g)"
              onChange={handleChange}
              name="weight"
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1} alignItems="flex-end">
          <form>
            <select
              className={classes.discTypeSelect}
              onChange={handleChange}
              name="discType"
            >
              {discTypes?.map((type) => (
                <option key={type.id} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </form>
        </Grid>
        <br />
        <h3 className={classes.headers}>Flight Numbers</h3>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SpeedRoundedIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <TextField
              id="speedInput"
              label="Speed (1 to 14)"
              onChange={handleChange}
              name="speed"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <FlightTakeoffRoundedIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <TextField
              id="glideInput"
              label="Glide (1 TO 7)"
              onChange={handleChange}
              name="glide"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <ArrowForwardRoundedIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <TextField
              id="turnInput"
              label="Turn (+1 TO -5)"
              onChange={handleChange}
              name="turn"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <ArrowBackRoundedIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item>
            <TextField
              id="fadeInput"
              label="Fade (0 TO 5)"
              onChange={handleChange}
              name="fade"
            />
          </Grid>
        </Grid>
        <br/>
        <h3 className={classes.headers}>Condition</h3>
        <div className={classes.slider}>
        <Grid container spacing={1} alignItems="flex-end">
          <Slider
            defaultValue={1}
            step={1}
            marks={marks}
            min={1}
            max={10}
            valueLabelDisplay="on"
            name="condition"
            onChangeCommitted={handleChange}
          />
        </Grid>
        </div>
      </div>
    </div>
  );
}

export default AddDisc;
