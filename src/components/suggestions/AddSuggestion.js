import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, TextField, Grid, Button } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker }
  from '@material-ui/pickers';
import { inject, observer } from 'mobx-react'
import axios from "axios";

function AddSuggestion(props) {
  const [selectedStartDate, setStartSelectedDate] = useState(new Date());
  const [selectedEndDate, setEndSelectedDate] = useState(new Date());
  const [selectedFiles, setSelectedFiles] = useState('')
  const [imageDescription, setImageDescription] = useState('')
  const [image, setImage] = useState({ imageTitle: '', imageURL: '', id: '' })
  const [gallery, setGallery] = useState([])
  const [inputs, setInputs] = useState({ title: '', countries: [], description: '', startDate: null, endDate: null })

  const url = 'https://api.cloudinary.com/v1_1/domephsm4/image/upload';
  const preset = 'natalia';

  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndSelectedDate(date);
  };

  const fileChangedHandler = ({ target }) => {
    setSelectedFiles(target.files[0])
  }

  const uploadHandler = async () => {
    const formData = new FormData();
    formData.append('file', selectedFiles);
    formData.append('upload_preset', preset);
    try {
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      let tempImage = { ...image }
      tempImage.imageURL = imageUrl
      tempImage.imageTitle = imageDescription
      tempImage.id = res.data.public_id
      setImage(tempImage)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let tempGallery = [...gallery]
    if (image.imageURL !== '') {
      tempGallery.push(image)
      setGallery(tempGallery)
    }
  }, [image])

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
          <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <TextField name='title' onChange={({ target }) => setImageDescription(target.value)} id="standard-basic" label="Describe the image" /> <br></br>
              <Button onClick={uploadHandler} variant="contained">Upload</Button>
            </div>
            <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <TextField name='title' onChange={({ target }) => setImageDescription(target.value)} id="standard-basic" label="Describe the image" /> <br></br>
              <Button onClick={uploadHandler} variant="contained">Upload</Button>
            </div>
            <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <TextField name='title' onChange={({ target }) => setImageDescription(target.value)} id="standard-basic" label="Describe the image" /> <br></br>
              <Button onClick={uploadHandler} variant="contained">Upload</Button>
            </div>
            <div className='uploadImage'>
              <input className='uploadFile' type="file" onChange={fileChangedHandler} />
              <TextField name='title' onChange={({ target }) => setImageDescription(target.value)} id="standard-basic" label="Describe the image" /> <br></br>
              <Button onClick={uploadHandler} variant="contained">Upload</Button>
              {/* <Button variant="contained" component="label" > Upload File <input type="file" hidden/>
               </Button> */}
            </div>
          </div>
          <div>
            <Button onClick={sendNewEvent} variant="contained">Send</Button></div>
        </div>
      </Container>
    </React.Fragment>
  );
}
export default inject("EventsStore")(observer(AddSuggestion))
