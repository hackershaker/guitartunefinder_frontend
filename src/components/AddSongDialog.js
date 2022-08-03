import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AddSongDialog = (props) => {
  const [form, setForm] = useState({ name: "", tuning: "", artist: "" });

  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle>Add New Tuning</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item flexDirection="row">
              <Typography>Song name:</Typography>
              <TextField
                autoFocus
                value={form["name"]}
                onChange={(e) => setForm({ ...form, ["name"]: e.target.value })}
              ></TextField>
            </Grid>
            <Grid item>
              <Typography>Tuning:</Typography>
              <TextField
                value={form["tuning"]}
                onChange={(e) =>
                  setForm({ ...form, ["tuning"]: e.target.value })
                }
              ></TextField>
            </Grid>
            <Grid item>
              <Typography>Artist:</Typography>
              <TextField
                value={form["artist"]}
                onChange={(e) =>
                  setForm({ ...form, ["artist"]: e.target.value })
                }
              ></TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log(form);
              props.fetchAddSong(form);
              props.onClose();
            }}
          >
            Save
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSongDialog;
