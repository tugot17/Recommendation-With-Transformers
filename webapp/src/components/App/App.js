import {useContext, useEffect, useState} from "react";
import Papa from 'papaparse';
import firebase from "firebase";
import { FirestoreProvider } from "@react-firebase/firestore";
import {config} from "../../config";
import GameList from "../GameList/GameList";
import {makeStyles} from "@material-ui/core/styles";
import {menuElements} from "../../config";
import UserList from "../UserList/UserList";
import {store} from "../../hooks/store";


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
  const { state } = useContext(store);
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
    <FirestoreProvider {...config} firebase={firebase}>
      <div className={classes.root}>
        { state.menu === menuElements.APPS && <GameList gameData={games} />}
        { state.menu === menuElements.USERS && <UserList gameData={games} />}
      </div>
    </FirestoreProvider>
  );
}

export default App;
