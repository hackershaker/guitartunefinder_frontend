import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import TuneSelector from "./TuneSelector";
import "../style/Tunesetting.css"

const TuningSetting = (props) => {

  const tuneChange = (key, value) => {
    props.tunedic.current[key] = value;
  };

  useEffect(() => {
    props.setTune(props.returnTuneString(props.tunedic))
  }, [])

  return (
    <div className="tunesettingmodule">
      <Autocomplete
        options={TuningList}
        renderInput={(params) => <TextField {...params} label="Tuning" />}
        sx={{ width: "300", margin: "20px" }}
      ></Autocomplete>
      <Grid container sx={{ justifyContent: "space-evenly" }}>
  
          <TuneSelector
            stringNum="6"
            tune="E"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
          
          <TuneSelector
            stringNum="5"
            tune="A"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
          
          <TuneSelector
            stringNum="4"
            tune="D"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
          
          <TuneSelector
            stringNum="3"
            tune="G"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
          
          <TuneSelector
            stringNum="2"
            tune="B"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
          
          <TuneSelector
            stringNum="1"
            tune="E"
            tunedic={props.tunedic}
            tuneChange={tuneChange}
          />
      </Grid>
    </div>
  );
};

const TuningList = [{ label: "Standard Tuning", tuning: "EADGBE" }];

export default TuningSetting;
