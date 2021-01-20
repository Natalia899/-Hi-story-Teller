import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Moment from 'react-moment';
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button';



function AddSuggestion(props) {

  const [selectedStartDate, setStartSelectedDate] = useState(new Date());
  const [selectedEndDate, setEndSelectedDate] = useState(new Date());
  const [selectedFiles, setSelectedFiles] = useState([])
  const [inputs, setInputs] = useState({ title: '', countries: [], description: '', startDate: null, endDate: null })

  const handleStartDateChange = (date) => {
    console.log(date)
    setStartSelectedDate(date);
    console.log(selectedStartDate)
  };

  const handleEndDateChange = (date) => {
    console.log(date)
    setEndSelectedDate(date);
    console.log(selectedEndDate)
  };

  const fileChangedHandler = ({ target }) => {
    let tempList = [...selectedFiles]
    let newImage= {
      imageTitle: target.value, 
      imageURL: target.files
    }
    setSelectedFiles(target.files)
  }

  const uploadHandler = () => {
    console.log(selectedFiles)
  }

  const inputsHandler = ({ target }) => {
    let tempObj = { ...inputs }
    tempObj[target.name] = target.value
    setInputs(tempObj)
    console.log(inputs)
  }

  const sendNewEvent = () => {
    let newEvent = {
      title: `${inputs.title}, ${selectedStartDate.toDateString().slice(3)} - ${selectedEndDate.toDateString().slice(3)} `,
      startDate: selectedStartDate.getFullYear(),
      endDate: selectedEndDate.getFullYear(),
      description: inputs.description,
      countries: [inputs.countries],
      gallery: selectedFiles,
      //username: props.EventsStore.user.username
    }
    console.log(newEvent)

  }



  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h4>Send us your (hi)story</h4>
        <div>
          <TextField name='title' id="standard-basic" label="Title" onChange={inputsHandler} value={inputs.title} /> <br />
          <TextField name='countries' id="standard-basic" label="Country" onChange={inputsHandler} value={inputs.countries} />
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
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker name='endDate'
                margin="normal"
                id="date-picker-dialog"
                label="End date"
                format="MM/dd/yyyy"
                minDate="Date(1600-01-01)"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <div for="w3review">Description</div>
          <textarea name='description' id="w3review" rows="15" cols="80" value={inputs.description} onChange={inputsHandler} />
          <div> Upload images (optional):
            {/* <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <input className='imageDescription' type='text' onChange={fileChangedHandler} name='imageDescription' placeholder='describe the image' />
           
            </div>
            <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <input className='imageDescription' type='text' name='imageDescription' placeholder='describe the image' />
            
            </div>
            <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <input className='imageDescription' type='text' name='imageDescription' placeholder='describe the image' />
             
            </div> */}
            <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <input className='imageDescription' type='text' name='imageDescription' placeholder='describe the image' />
            <Button onClick={uploadHandler} variant="contained">Upload</Button>
            </div>
          </div>
          <div><Button onClick={sendNewEvent} variant="contained">Send</Button></div>
        </div>


      </Container>
    </React.Fragment>
  );
}
export default inject("EventsStore")(observer(AddSuggestion))
