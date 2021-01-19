import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


export default function SimpleContainer() {

  const [selectedDate, setSelectedDate] = React.useState(new Date('1600-01-01T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
        <h4>Send us your (hi)story</h4>
        <div>
        <TextField id="standard-basic" label="Title" /> <br/>
        <TextField id="standard-basic" label="Country" />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start date"
          minDate="Date(1600-01-01)"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="End date"
          format="MM/dd/yyyy"
          value={selectedDate}
          minDate="Date(1600-01-01)"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    {/* <TextareaAutosize aria-label="minimum height"  width= '500vw' rowsMin={30} placeholder="Description" />; */}

    <div for="w3review">Description</div>
<textarea id="w3review" name="w3review" rows="15" cols="80">

</textarea>

        </div>


      </Container>
    </React.Fragment>
  );
}