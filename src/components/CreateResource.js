import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import * as resourcesActions from "../store/actions/resources";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
}));

function CreateResource(props) {
  const classes = useStyles();
  const [name, setName] = useState({ value: "", valid: false });
  const [type, setType] = useState({ value: "", valid: false });
  const [max, setMax] = useState({ value: "", valid: false });
  const [stRate, setStRate] = useState({ value: "", valid: false });

  const handleCreateResource = (e) => {
    e.preventDefault();
    console.log("resource created");
    props.onCreateResource(name.value, type.value, max.value, stRate.value)
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (newName === "") setName({ value: "", valid: false });
    else setName({ value: newName, valid: true });
  };
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    if (newType === "") setType({ value: "", valid: false });
    else setType({ value: newType, valid: true });
  };
  const handleMaxChange = (e) => {
    const newMax = e.target.value;
    if (newMax > 900 || newMax < 0 || isNaN(newMax)) return;
    if (newMax === "") setMax({ value: "", valid: false });
    else setMax({ value: newMax, valid: true });
  };

  const handleStRateChange = (e) => {
    const newStRate = e.target.value;
    if (isNaN(newStRate)) return;
    if (newStRate === "") setStRate({ value: "", valid: false });
    else setStRate({ value: newStRate, valid: true });
  };

  return (
    <Paper square className={classes.paper}>
      <Typography variant="h5">Create a resource:</Typography>
      <form>
        <TextField
          className={classes.textField}
          required
          id="name"
          label="Resource Name"
          margin="dense"
          value={name.value}
          onChange={handleNameChange}
        />
        <FormControl className={classes.formControl} margin="dense" required>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type.value}
            onChange={handleTypeChange}
          >
            <MenuItem value={"work"}>Work</MenuItem>
            <MenuItem value={"material"}>Material</MenuItem>
            <MenuItem value={"cost"}>Cost</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          className={classes.textField}
          required
          id="type"
          label="Type"
          margin="dense"
        /> */}
        <TextField
          className={classes.textField}
          required
          id="max"
          label="Max No.Resource"
          margin="dense"
          value={max.value}
          onChange={handleMaxChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextField
          className={classes.textField}
          required
          id="stRate"
          label="St.Rate"
          margin="dense"
          value={stRate.value}
          onChange={handleStRateChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">$/hr</InputAdornment>,
          }}
        />

        <Button
          onClick={handleCreateResource}
          variant="contained"
          color="primary"
          type={"submit"}
          disabled={!(name.valid && type.valid && max.valid && stRate.valid)}
        >
          Create new resource
        </Button>
      </form>
    </Paper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateResource: (name, type, max, rate) =>
      dispatch(
        resourcesActions.createResourceInProject(name, type, max, rate)
      ),
  };
};

export default connect(null, mapDispatchToProps)(CreateResource);