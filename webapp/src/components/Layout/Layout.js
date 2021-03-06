import { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonIcon from "@material-ui/icons/Person";
import { orange, deepOrange, purple, blue } from "@material-ui/core/colors";

// For Switch Theming
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { store, ACTIONS } from "../../hooks/store";
import { menuElements } from "../../config";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyrights © "}
      <Link
        color="inherit"
        href="https://github.com/tugot17/Recommendation-With-Transformers"
      >
        Recommendation With Transformers
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      padding: 0,
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 60px)`,
    },
    stickyCopyright: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translate(-50%, -8px)",
    },
  };
});

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [darkState, setDarkState] = useState(true);
  const { state, dispatch } = useContext(store);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? blue[900] : purple[600];
  const mainSecondaryColor = darkState ? orange[900] : deepOrange[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const classes = useStyles();
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const setMenuGames = () => {
    dispatch({
      type: ACTIONS.SET_MENU,
      value: menuElements.APPS,
    });
  };

  const setMenuUsers = () => {
    dispatch({
      type: ACTIONS.SET_MENU,
      value: menuElements.USERS,
    });
  };

  const setMenuStats = () => {
    dispatch({
      type: ACTIONS.SET_MENU,
      value: menuElements.STATS,
    });
  };

  const setMenuProfile = () => {
    dispatch({
      type: ACTIONS.SET_MENU,
      value: menuElements.PROFILE,
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {
                state.menu === menuElements.APPS && 'Games'
              }
              {
                state.menu === menuElements.USERS && 'Users'
              }
              {
                state.menu === menuElements.STATS && 'Dashboard'
              }
              {
                state.menu === menuElements.PROFILE && 'Profile'
              }
            </Typography>
            <Switch checked={darkState} onChange={handleThemeChange} />
            <IconButton color="inherit" onClick={setMenuProfile}>
              <Badge badgeContent={state.user.games.length} color="secondary">
                <PersonIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              <ListItem
                button
                selected={state.menu === menuElements.APPS}
                onClick={setMenuGames}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Games" />
              </ListItem>
              <ListItem
                button
                selected={state.menu === menuElements.USERS}
                onClick={setMenuUsers}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem
                button
                selected={state.menu === menuElements.STATS}
                onClick={setMenuStats}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Stats" />
              </ListItem>
            </div>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            {children}
          </Container>
          <Box pt={4} className={classes.stickyCopyright}>
            <Copyright />
          </Box>
        </main>
      </div>
    </ThemeProvider>
  );
}
