import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useState} from "react";
import GameList from "../GameList/GameList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
  },
  media: {
    height: 300,
    width: 500,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function UserDetails({user, games}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(['games']);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel, expanded)
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter(el => el !== panel));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user.name ? user.name.substring(0,1) : user.userId}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name || user.userId}
        subheader={(new Date()).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      />
      <Accordion expanded={expanded.includes('games')} onChange={handleChange('games')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-games-content"
          id="panel-games-header"
        >
          <Typography className={classes.heading}>Games</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GameList fixedHeight={false} elPerRow={8} gameData={games.filter(el => user.games.includes(el.appid))} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded.includes('recommendations')} onChange={handleChange('recommendations')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-recommendations-content"
          id="panel-recommendations-header"
        >
          <Typography className={classes.heading}>Recommendations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}