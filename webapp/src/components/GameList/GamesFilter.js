import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from '@material-ui/core/Grid';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  container: {
    padding: theme.spacing(2),
  },
}));

export default function GamesFilter({
  id = "filter-menu",
  isOpen,
  anchorEl,
  onClose,
  onChange = () => {},
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    showDLC: true,
    showDEMO: true,
    owned: true,
    age: [0,99]
  });
  const [age, setAge] = useState([0, 99]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.checked)
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleRangeChange = (event, newValue) => {
    setAge(newValue);
  };

  const handleRangeCommit = (event, newValue) => {
    setAge(newValue);
    setState({ ...state, age: newValue });
  };

  useEffect(() => {
    onChange(state);
  }, [state, onChange]);
  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Paper className={classes.container} elevation={10}>
        <FormGroup column>
          <FormControlLabel
            control={
              <Switch
                checked={state.showDLC}
                onChange={handleChange}
                name="showDLC"
                color="secondary"
              />
            }
            label="Show DLC?"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.showDEMO}
                onChange={handleChange}
                name="showDEMO"
                color="secondary"
              />
            }
            label="Show Demo?"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.owned}
                onChange={handleChange}
                name="owned"
                color="secondary"
              />
            }
            label="Show Owned?"
          />

          <Typography id="age-slider" gutterBottom style={{paddingTop: '12px'}}>
            Age range
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ChildCareIcon />
            </Grid>
            <Grid item xs>
              <Slider
                defaultValue={0}
                aria-labelledby="age-slider"
                valueLabelDisplay="auto"
                color={"secondary"}
                step={1}
                marks
                min={0}
                max={18}
                onChange={handleRangeChange}
                onChangeCommitted={handleRangeCommit}
                value={age}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Paper>
    </Popover>
  );
}
