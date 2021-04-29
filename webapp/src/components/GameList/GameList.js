import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { LazyLoadImage } from "react-lazy-load-image-component";
import GameDetailsDialog from "./GameDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  gridList: {
    width: "100%",
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 60px)`,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  topTitleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     appid: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function GameList({ gameData }) {
  const classes = useStyles();
  const [selectedGame, setSelectedGame] = useState({});

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={240}
        className={classes.gridList}
        cols={4}
        spacing={12}
      >
        {gameData.map((game) => (
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
                <IconButton aria-label={`star ${game.Title}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.topTitleBar}
            />
            <GridListTileBar
              title={game.Title}
              subtitle={
                <span>
                  Released:{" "}
                  {game.Release_Date.substring(0, 4) === "1970"
                    ? "Unknown"
                    : game.Release_Date.substring(0, 4)}
                  , Price: {game.Price === "0" ? "Free" : `${game.Price}$`}
                </span>
              }
              actionIcon={
                <IconButton
                  aria-label={`info about ${game.Title}`}
                  className={classes.icon}
                  onClick={() => setSelectedGame(game.appid)}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <GameDetailsDialog game={selectedGame} />
    </div>
  );
}
