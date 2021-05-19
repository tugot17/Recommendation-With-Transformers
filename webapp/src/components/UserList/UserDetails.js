import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useContext, useEffect, useState} from "react";
import GameList from "../GameList/GameList";
import {useFetch, ACTIONS} from "../../hooks/useFetch";
import {FirestoreMutation} from "@react-firebase/firestore";
import UserUpdate from "../Layout/UserUpdate";
import { ACTIONS as USER_ACTIONS, store } from "../../hooks/store";

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
  recommendationsAccordion: {
    flexDirection: "column"
  }
}));

export default function UserDetails({user, games}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(['recommendations']);
  const { status, data } = useFetch(`http://localhost:3001`, user.games);
  const { state, dispatch } = useContext(store);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter(el => el !== panel));
  };

  useEffect(() => {
    if (state.user.userId === user.userId && Array.isArray(data) && data.length > 0) {
      dispatch({
        type: USER_ACTIONS.SET_RECOMMENDATIONS,
        value: data,
      });
    }
  }, [data, state.user.userId, user.userId, dispatch])

  return (
    <Card className={classes.root}>
      {
        status === ACTIONS.FETCHED && <FirestoreMutation type="set" path={`/users/${user.userId}`}>
          {({ runMutation }) => {
            return <UserUpdate user={{...user, recommendations: Array.isArray(data) && data.length > 0 ? data : user.recommendations}} runMutation={runMutation} />
          }}
        </FirestoreMutation>
      }
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor: user.color}}>
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
      <Accordion expanded={expanded.includes('recommendations')} onChange={handleChange('recommendations')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color={"secondary"} fontSize="large" />}
          aria-controls="panel-recommendations-content"
          id="panel-recommendations-header"
        >
          <Typography className={classes.heading}>Recommendations</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.recommendationsAccordion}>
          {
            status === ACTIONS.FETCHING && <CircularProgress color="secondary" />
          }
          {
            status === ACTIONS.FETCH_ERROR && <Typography color="error">⚠ There was an error while fetching the data, please make sure that API service is working correctly ⚠</Typography>
          }
          {
            Array.isArray(data) && data.length > 0 && <GameList fixedHeight={false} elPerRow={4} gameData={games.filter(el => data.includes(el.appid))} />
          }
          {
            status === ACTIONS.FETCH_ERROR && Array.isArray(user.recommendations) && user.recommendations.length > 0 && <GameList fixedHeight={false} elPerRow={8} gameData={games.filter(el => user.recommendations.includes(el.appid))} />
          }
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded.includes('games')} onChange={handleChange('games')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color={"secondary"} fontSize="large" />}
          aria-controls="panel-games-content"
          id="panel-games-header"
        >
          <Typography className={classes.heading}>Owned Games</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GameList fixedHeight={false} elPerRow={8} gameData={games.filter(el => user.games.includes(el.appid))} />
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}