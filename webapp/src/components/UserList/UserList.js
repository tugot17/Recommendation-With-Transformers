import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import FaceIcon from "@material-ui/icons/Face";
import { FirestoreCollection } from "@react-firebase/firestore";
import { useState, Fragment } from "react";
import UserDetails from "./UserDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    justifyContent: "center",
    alignItems: 'top',
    background: theme.palette.background.default,
  },
  listContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  listContainerNarrow: {
    width: "25%",
    display: "flex",
    justifyContent: "center",
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    width: "95%",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  avatar: {
    height: 50,
  },
}));

export default function UserList({ gameData }) {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className={classes.root}>
      <div className={selectedUser ? classes.listContainerNarrow : classes.listContainer}>
        <Paper
          className={classes.paper}
          elevation={3}
        >
          <List dense className={classes.list}>
            <FirestoreCollection path="/users/" limit={1}>
              {(d) => {
                if (d.value == null) {
                  return <CircularProgress color="secondary" />;
                }
                return d.value.map((user) => {
                  const { userId, name, games } = user;
                  const labelId = `checkbox-list-secondary-label-${userId}`;

                  return (
                    <Fragment key={{ userId }}>
                      <ListItem
                        key={userId}
                        button
                        onClick={() => setSelectedUser(user)}
                        selected={selectedUser != null && selectedUser.userId === userId}
                      >
                        <ListItemAvatar>
                          <FaceIcon className={classes.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          id={labelId}
                          primary={
                            (name ? `${name}, ` : ' ') + `User ID: ${userId}`
                          }
                        />
                        <ListItemText
                          primary={
                            `Games: ${games.length}`
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  );
                });
              }}
            </FirestoreCollection>
          </List>
        </Paper>
      </div>
      {selectedUser != null && (
        <UserDetails user={selectedUser} games={gameData} />
      )}
    </div>
  );
}
