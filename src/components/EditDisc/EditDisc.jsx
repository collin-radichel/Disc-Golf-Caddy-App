import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import FlightTakeoffRoundedIcon from "@material-ui/icons/FlightTakeoffRounded";
import SpeedRoundedIcon from "@material-ui/icons/SpeedRounded";
import TextFieldsRoundedIcon from "@material-ui/icons/TextFieldsRounded";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";
import FitnessCenterRoundedIcon from "@material-ui/icons/FitnessCenterRounded";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    alignItems: "flex-center",
  },
  headers: {
    textAlign: "center",
    alignItems: "flex-end",
    fontSize: 30,
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

function EditDisc() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  //grab id out of the url
  const { id } = useParams();

  const discDetails = useSelector((store) => store.discDetails);
  const discTypes = useSelector((store) => store.discTypes);
  const discDistances = useSelector((store) => store.discDistances);
  const discFlightPatterns = useSelector((store) => store.discFlightPatterns);

  useEffect(() => {
    dispatch({ type: "FETCH_DISC_DETAILS", payload: id });
    dispatch({ type: "FETCH_DISC_TYPES" });
    dispatch({ type: "FETCH_DISC_DISTANCES" });
    dispatch({ type: "FETCH_DISC_FLIGHT_PATTERNS" });
  }, [id]);

  const handleEditInputs = (key) => (event) => {
    console.log("event", event);
    dispatch({
      type: "SET_EDIT_INPUTS",
      payload: { key, event: event.target.value },
    });
  };

  const saveChanges = () => {
    console.log("discDetails:::::", discDetails);
    // trigger a saga that will save our local changes in the DB
    dispatch({
      type: "SAVE_EDIT_DISC",
      payload: discDetails,
    });
    history.push(`/discDetails/${id}`);
  };

  const handleFlightPatternChange = (id) => {
    dispatch({ type: "EDIT_FLIGHT_PATTERN", payload: id });
  };

  const handleConditionChange = (event, value) => {
    console.log("value:", value);
    dispatch({ type: "EDIT_CONDITION", payload: value });
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
      <Grid item>
        <Typography className={classes.headers}>
          Edit your disc
          <br />
          then press SAVE CHANGES
        </Typography>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <TextFieldsRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="nameInput"
            value={discDetails.name}
            onChange={handleEditInputs("name")}
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
            value={discDetails.image_path}
            onChange={handleEditInputs("image_path")}
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
            value={discDetails.weight}
            onChange={handleEditInputs("weight")}
            name="weight"
          />
        </Box>
      </Grid>
      <br />
      <Grid item>
        <Box display="flex" alignItems="center">
          <select
            className={classes.discTypeSelect}
            onChange={handleEditInputs("type_id")}
            value={discDetails.type_id}
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
            value={discDetails.speed}
            onChange={handleEditInputs("speed")}
            name="speed"
          />
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <FlightTakeoffRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="glideInput"
            value={discDetails.glide}
            onChange={handleEditInputs("glide")}
            name="glide"
          />
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <ArrowForwardRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="turnInput"
            value={discDetails.turn}
            onChange={handleEditInputs("turn")}
            name="turn"
          />
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <ArrowBackRoundedIcon fontSize="small" color="primary" />
          <TextField
            id="fadeInput"
            value={discDetails.fade}
            onChange={handleEditInputs("fade")}
            name="fade"
          />
        </Box>
      </Grid>
      <br />

      <Grid item container>
        {discFlightPatterns &&
          discFlightPatterns.map((pattern) => (
            <Grid
              item
              key={pattern.id}
              display="flex"
              alignItems="center"
              xs={4}
            >
              <img
                onClick={() => handleFlightPatternChange(pattern.id)}
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
            defaultValue={discDetails?.condition}
            step={1}
            marks={marks}
            min={1}
            max={10}
            valueLabelDisplay="on"
            onChangeCommitted={handleConditionChange}
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
            onChange={handleEditInputs("distance_id")}
            value={discDetails.distance_id}
            name="distance_id"
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
      <Typography>Notes</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            multiline
            rows={4}
            variant="outlined"
            name="notes"
            value={discDetails.notes}
            onChange={handleEditInputs("notes")}
          />
        </Box>
      </Grid>
      <button onClick={saveChanges}>SAVE CHANGES</button>
    </Grid>
  );
}

export default EditDisc;
