
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { inject, observer } from 'mobx-react';
import React, { useState, UseEffect, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function QuizStart(props) {
  console.log(props.EventsStore.quiz);
  const [eventId, setEventId] = useState('');
  const [players, setPlayers] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const handleChange = (event) => {
    let result = event.target.value
    setEventId(result);
  };


  useEffect(() => {
    props.EventsStore.getQuiz()
  }, [])

  // const startGame = () => {

  // }

  return (<div>

    <FormControl component="fieldset">
      <FormLabel component="legend">Subjects</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={eventId} onChange={handleChange}>
        {props.EventsStore.quiz && props.EventsStore.quiz.map(q => {
          return (
            <FormControlLabel value={q.id} control={<Radio />} label={q.title} />
          )
        })}
      </RadioGroup>
    </FormControl>

    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={players} onChange={(e) => setPlayers(e.target.value)}>
        <FormControlLabel value="1" control={<Radio />} label="1 Player" />
        <FormControlLabel value="2" control={<Radio />} label="2 Players" />
      </RadioGroup>
    </FormControl>

    <Button onClick={()=>setRedirect(true)}> Play</Button>

    {players == 2 && redirect ? <Redirect to={`/QuizSocket/${eventId}`} /> : null}
    {players == 1 && redirect ? <Redirect to={`/QuizQuestion/${eventId}`} /> : null}
    {/* <Link to={`/quiz/${eventId}`}><Button  variant="contained" color="primary">
  PLAY
</Button> </Link> */}
  </div>)

}

export default inject("EventsStore")(observer(QuizStart))