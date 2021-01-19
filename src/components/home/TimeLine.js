import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { inject, observer} from 'mobx-react';

const useStyles = makeStyles({
  root: {
    width: 1000,
  },
});

function TimeLine(props) {
  const classes = useStyles();

  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (event, newValue) => {
    props.EventsStore.setDateRange(newValue)
  };

  return (
    <div className={classes.root}>

      <Typography id="range-slider" gutterBottom>
        Years Range
      </Typography>

      <Slider
        value={props.EventsStore.dateRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={1600}
        max={2000}
      />
      
    </div>
  );
}

export default inject("EventsStore")(observer(TimeLine))

