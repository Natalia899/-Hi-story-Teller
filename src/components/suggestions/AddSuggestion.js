import React, { useState } from 'react';
import { CssBaseline, Container, TextField, Grid, Button } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker }
  from '@material-ui/pickers';
import { inject, observer } from 'mobx-react'
import axios from "axios";
import { Link } from 'react-router-dom'
import UploadImages from './UploadImages'

function AddSuggestion(props) {
  const [selectedStartDate, setStartSelectedDate] = useState(new Date());
  const [selectedEndDate, setEndSelectedDate] = useState(new Date());
  const [gallery, setGallery] = useState([])
  const [inputs, setInputs] = useState({ title: '', countries: [], description: '' })

  const updateGallery = (updatedGallery) => {
      setGallery(updatedGallery)
  }

  const inputsHandler = ({ target }) => {
    let tempObj = { ...inputs }
    tempObj[target.name] = target.value
    setInputs(tempObj)
  }

  const sendNewEvent = async () => {
    let newEvent = {
      title: `${inputs.title}, ${selectedStartDate.toDateString().slice(3)} - ${selectedEndDate.toDateString().slice(3)} `,
      startDate: selectedStartDate.getFullYear(),
      endDate: selectedEndDate.getFullYear(),
      description: inputs.description,
      countries: [inputs.countries],
      gallery: gallery,
      username: props.EventsStore.user.username
    }
    await axios.post('http://localhost:4200/event', newEvent)
  }
  return (
    <React.Fragment>
      <Link to='/home'>
        Home
				</Link>
      <CssBaseline />
      <Container maxWidth="sm">
        <h4>Send us your (hi)story</h4>
        <div>
          <TextField name='title' id="standard-basic" label="Title" onChange={inputsHandler} value={inputs.title} /> <br />
          <TextField name='countries' id="standard-basic" label="Countries" onChange={inputsHandler} value={inputs.countries} />
          <MuiPickersUtilsProvider utils={DateFnsUtils} onChange={inputsHandler} >
            <Grid container justify="space-around">
              <KeyboardDatePicker name='startDate'
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start date"
                minDate="Date(1600-01-01)"
                value={selectedStartDate}
                onChange={(date) => setStartSelectedDate(date)}
                KeyboardButtonProps={{ 'aria-label': 'change date', }} />
              <KeyboardDatePicker name='endDate'
                margin="normal"
                id="date-picker-dialog"
                label="End date"
                format="MM/dd/yyyy"
                minDate="Date(1600-01-01)"
                value={selectedEndDate}
                onChange={(date) => setEndSelectedDate(date)}
                KeyboardButtonProps={{ 'aria-label': 'change date', }} />
            </Grid>
          </MuiPickersUtilsProvider>
          <div for="w3review">Description</div>
          <textarea name='description' id="w3review" rows="15" cols="80" value={inputs.description} onChange={inputsHandler} />
<UploadImages updateGallery={updateGallery} />
          
          <div>
            <Button onClick={sendNewEvent} variant="contained">Send</Button></div>
        </div>
      </Container>
    </React.Fragment>
  );
}
export default inject("EventsStore")(observer(AddSuggestion))
