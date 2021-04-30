import React, {useContext, useEffect, useState} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import {store} from "../../hooks/store";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  iframe: {
    transform: "translate(25%, 25%) scale(1.5)",
  },
  title: {
    color: '#fff'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 646 * 1.55,
    height: 190 * 1.6,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles(styles);

export default function GameDetailsDialog({ game = {}, onClose = () => {}, onSelect = () => {} }) {
  const classes = useStyles();
  const { state } = useContext(store);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(game.appid != null);
  }, [game]);

  const handleClose = () => {
    onClose({});
  };

  const handleSelect = () => {
    onSelect(game.appid);
  }

  return (
    game.appid != null && (
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={"lg"}
        open={open}
        PaperProps={{
          style: {
            backgroundImage: `url('https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/page_bg_generated_v6b.jpg')`,
          },
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <span className={classes.title}>{game.Title}</span>
        </DialogTitle>
        <DialogContent dividers>
          <iframe
            title={game.Title}
            className={classes.iframe}
            width="646"
            height="190"
            frameBorder="0"
            src={`https://store.steampowered.com/widget/${game.appid}`}
          />
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={state.user.games.includes(game.appid) ? <StarIcon /> : <StarBorderIcon />}
            onClick={handleSelect}
            color="secondary"
            variant="outlined"
          >
            {state.user.games.includes(game.appid) ? 'Remove from my list' : 'Add to my list'}
          </Button>
          <Button autoFocus onClick={handleClose}>
            <span className={classes.title}>Close</span>
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
