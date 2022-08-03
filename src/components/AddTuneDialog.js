import { Button, Dialog, DialogTitle } from "@mui/material";

const AddTuneDialog = (props) => {
  return (
    <div>
      <Dialog open={props.open}>
        <DialogTitle>Add New Tuning</DialogTitle>
        <Button onClick={props.onClose}>Cancel</Button>
      </Dialog>
    </div>
  );
};

export default AddTuneDialog;
