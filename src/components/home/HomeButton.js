import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { inject, observer} from 'mobx-react';
import { Link, Redirect } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function HomeButton(props) {
  const classes = useStyles();

  const eventsPage = () => {
    
  }

  return (
    <div className={classes.root}>
        <Link to="/events">
            <Button variant="contained" color="secondary" onClick={props.EventsStore.eventsRender}> 
                Search!
            </Button>
        </Link>
    </div>
  );
}

export default inject("EventsStore")(observer(HomeButton))