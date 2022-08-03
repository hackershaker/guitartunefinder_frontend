import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import TuneSelector from "./TuneSelector";

const TuningSetting = (props) => {

  const tuneChange = (key, value) => {
    props.tunedic.current[key] = value;
  };

  useEffect(() => {
    props.setTune(props.returnTuneString(props.tunedic))
  }, [])

  return (
    <div>
      <Autocomplete
        options={TuningList}
        renderInput={(params) => <TextField {...params} label="Tuning" />}
        sx={{ width: "300", margin: "20px" }}
      ></Autocomplete>
      <Grid container sx={{ justifyContent: "space-evenly" }}>
        <Grid item>
          6
          <TuneSelector
            stringNum="6"
            tune="E"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
        </Grid>
        <Grid item>
          5
          <TuneSelector
            stringNum="5"
            tune="A"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
        </Grid>
        <Grid item>
          4
          <TuneSelector
            stringNum="4"
            tune="D"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
        </Grid>
        <Grid item>
          3
          <TuneSelector
            stringNum="3"
            tune="G"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
        </Grid>
        <Grid item>
          2
          <TuneSelector
            stringNum="2"
            tune="B"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
        </Grid>
        <Grid item>
          1
          <TuneSelector
            stringNum="1"
            tune="E"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const TuningList = [{ label: "Standard Tuning", tuning: "EADGBE" }];

export default TuningSetting;
