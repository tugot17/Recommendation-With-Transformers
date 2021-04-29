import {useEffect, useState} from "react";
import Papa from 'papaparse';
import GameList from "../GameList/GameList";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
}));

function App() {
  const classes = useStyles();
  const [games, setGames] = useState([])

  useEffect(() => {
    Papa.parse("/Recommendation-With-Transformers/app_id_info.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        console.log(results)
        setGames(results.data)
      }
    });
  }, [])
  return (
    <div className={classes.root}>
      <GameList gameData={games.slice(0, 20)} />
    </div>
  );
}

export default App;
