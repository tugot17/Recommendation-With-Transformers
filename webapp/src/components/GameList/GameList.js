import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FilterListIcon from "@material-ui/icons/FilterList";
import StarIcon from "@material-ui/icons/Star";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useIntersectionObserver from "@react-hook/intersection-observer";
import GameDetailsDialog from "./GameDetails";
import clsx from "clsx";
import { ACTIONS, store } from "../../hooks/store";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import GamesFilter from "./GamesFilter";

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
  gridList: {
    width: "100%",
  },
  gridListFullHeight: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 60px)`,
  },
  gridListPaddingTop: {
    paddingTop: `${theme.spacing(12)}px !important`,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  topTitleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  searchContainer: {
    padding: theme.spacing(2),
    height: theme.spacing(12),
    position: "absolute",
    width: "100%",
    zIndex: 1,
    backgroundColor: `${theme.palette.background.default}aa`,
    fontWeight: "bold",
  },
}));

function filterGames(games, filters = {}, searchText = "", userGames = []) {
  const searchRegex = new RegExp(searchText, "ig");
  let filteredGames = games;
  filteredGames = filteredGames.filter(
    (game) => game.Title.match(searchRegex) != null
  );
  if (!filters.showDLC) {
    filteredGames = filteredGames.filter((game) => game.Type !== "dlc");
  }
  if (!filters.showDEMO) {
    filteredGames = filteredGames.filter((game) => game.Type !== "demo");
  }
  if (!filters.owned) {
    filteredGames = filteredGames.filter(
      (game) => !userGames.includes(game.appid)
    );
  }
  if (filters.age && filters.age.length === 2) {
    filteredGames = filteredGames.filter(
      (game) =>
        Number(game.Required_Age) >= filters.age[0] &&
        Number(game.Required_Age) <= filters.age[1]
    );
  }

  return filteredGames;
}

export default function GameList({
  gameData,
  fixedHeight = true,
  elPerRow = 4,
  showSearch = false,
}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  const [selectedGame, setSelectedGame] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    showDLC: true,
    showDEMO: true,
    owned: true,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [ref, setRef] = useState();
  const [scrollPos, setScrollPos] = useState(0);
  const { isIntersecting } = useIntersectionObserver(ref);
  const filteredGames = filterGames(gameData, filter, search, state.user.games);

  useEffect(() => {
    if (isIntersecting) {
      setScrollPos((s) => s + 20);
    }
  }, [isIntersecting]);

  useEffect(() => {
    setScrollPos(20);
  }, [gameData]);

  const toggleGame = (appId) => {
    dispatch({
      type: state.user.games.includes(appId)
        ? ACTIONS.REMOVE_USER_GAME
        : ACTIONS.ADD_USER_GAME,
      value: appId,
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filterOpen = Boolean(anchorEl);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.root} id="main-grid">
      {showSearch && (
        <Grid container spacing={3} className={classes.searchContainer}>
          <Grid item xs={11}>
            <TextField
              id="search"
              value={search}
              color="secondary"
              name="search"
              label="Search"
              fullWidth
              style={{ fontWeight: "bold" }}
              onChange={updateSearch}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="filter"
              color={"secondary"}
              onClick={handleClick}
            >
              <FilterListIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <GamesFilter
        isOpen={filterOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        onChange={updateFilter}
      />
      <GridList
        cellHeight={240}
        className={clsx(
          classes.gridList,
          fixedHeight ? classes.gridListFullHeight : false,
          showSearch ? classes.gridListPaddingTop : false
        )}
        cols={elPerRow}
        spacing={12}
      >
        {filteredGames.slice(0, scrollPos).map((game) => (
          <GridListTile key={game.appid}>
            <LazyLoadImage
              alt={game.Title}
              height={240}
              src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg?t=1599172963`} // use normal <img> attributes as props
              width={"auto"}
            />
            <GridListTileBar
              titlePosition="top"
              actionIcon={
                <IconButton
                  aria-label={`star ${game.Title}`}
                  className={classes.icon}
                  onClick={() => toggleGame(game.appid)}
                >
                  {state.user.games.includes(game.appid) ? (
                    <StarIcon color={"secondary"} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              }
              actionPosition="left"
              className={classes.topTitleBar}
            />
            <GridListTileBar
              title={game.Title}
              subtitle={
                <span>
                  {game.Release_Date.substring(0, 4) === "1970"
                    ? ""
                    : `Released: ${game.Release_Date.substring(0, 4)}, `}
                  {game.Price === "0" ? "" : `Price: ${game.Price}$`}
                </span>
              }
              actionIcon={
                <IconButton
                  aria-label={`info about ${game.Title}`}
                  className={classes.icon}
                  onClick={() => setSelectedGame(game)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
        <div ref={setRef}></div>
      </GridList>
      <GameDetailsDialog
        game={selectedGame}
        onClose={setSelectedGame}
        onSelect={toggleGame}
      />
    </div>
  );
}
