import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useContext } from "react";
import { ACTIONS, store } from "../../hooks/store";
import GameList from "../GameList/GameList";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  grid: {
    marginBottom: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
  },
}));

export default function Profile({ gameData }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);

  const setName = (event) => {
    dispatch({
      type: ACTIONS.SET_USER,
      value: {
        ...state.user,
        name: event.target.value,
      },
    });
  };

  const setColor = (event) => {
    dispatch({
      type: ACTIONS.SET_USER,
      value: {
        ...state.user,
        color: event.target.value,
      },
    });
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6" align="center">
            ID: {state.user.userId}, Created at: {state.user.created}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            error={state.user.name === ''}
            value={state.user.name}
            color="secondary"
            name="name"
            label="Your Name"
            fullWidth
            autoComplete="given-name"
            helperText="Please provide some kind of username"
            onChange={setName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="color-select-label" color="secondary">
              Color
            </InputLabel>
            <Select
              labelId="color-select-label"
              id="color-select"
              color="secondary"
              value={state.user.color}
              style={{ backgroundColor: state.user.color }}
              onChange={setColor}
            >
              <MenuItem
                value={"#d32f2f"}
                style={{ backgroundColor: "#d32f2f" }}
              >
                <span>Red</span>
              </MenuItem>
              <MenuItem
                value={"#c2185b"}
                style={{ backgroundColor: "#c2185b" }}
              >
                <span>Pink</span>
              </MenuItem>
              <MenuItem
                value={"#7b1fa2"}
                style={{ backgroundColor: "#7b1fa2" }}
              >
                <span>Purple</span>
              </MenuItem>
              <MenuItem
                value={"#512da8"}
                style={{ backgroundColor: "#512da8" }}
              >
                <span>Deep Purple</span>
              </MenuItem>
              <MenuItem
                value={"#303f9f"}
                style={{ backgroundColor: "#303f9f" }}
              >
                <span>Indigo</span>
              </MenuItem>
              <MenuItem
                value={"#1976d2"}
                style={{ backgroundColor: "#1976d2" }}
              >
                <span>Blue</span>
              </MenuItem>
              <MenuItem
                value={"#0288d1"}
                style={{ backgroundColor: "#0288d1" }}
              >
                <span>Light Blue</span>
              </MenuItem>
              <MenuItem
                value={"#0097a7"}
                style={{ backgroundColor: "#0097a7" }}
              >
                <span>Cyan</span>
              </MenuItem>
              <MenuItem
                value={"#00796b"}
                style={{ backgroundColor: "#00796b" }}
              >
                <span>Teal</span>
              </MenuItem>
              <MenuItem
                value={"#388e3c"}
                style={{ backgroundColor: "#388e3c" }}
              >
                <span>Green</span>
              </MenuItem>
              <MenuItem
                value={"#fbc02d"}
                style={{ backgroundColor: "#fbc02d" }}
              >
                <span>Yellow</span>
              </MenuItem>
              <MenuItem
                value={"#f57c00"}
                style={{ backgroundColor: "#f57c00" }}
              >
                <span>Orange</span>
              </MenuItem>
              <MenuItem
                value={"#e64a19"}
                style={{ backgroundColor: "#e64a19" }}
              >
                <span>Deep Orange</span>
              </MenuItem>
            </Select>
            <FormHelperText>Color assigned to your user</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Typography component="h1" variant="h6" align="center">
        Your games
      </Typography>
      <GameList
        fixedHeight={false}
        elPerRow={8}
        gameData={gameData.filter((el) => state.user.games.includes(el.appid))}
      />
      {
        state.user.recommendations && <Typography component="h1" variant="h6" align="center">
          Recommendations
        </Typography>
      }
      {
        state.user.recommendations && <GameList
          fixedHeight={false}
          elPerRow={8}
          gameData={gameData.filter((el) => state.user.recommendations.includes(el.appid))}
        />
      }
    </Paper>
  );
}
