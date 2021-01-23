
import { inject, observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

function QuizQuestion(props) {

	const [counter, setCounter] = useState(0)
	const [score, setScore] = useState(0)
	const [isCorrect, setIsCorrect] = useState(false)

	const { quiz } = props.EventsStore
	const eventId = props.match.params.eventId
	const eventQuestions = quiz.find(q => { return q.id === eventId }).quiz
	console.log(eventQuestions)

	const inputHandler = (event) => {
		setIsCorrect(event.target.value)
		setValue(event.target.value)
	}

	const checkAnswer = () => {
		setCounter(counter + 1)
		isCorrect ? setScore(score + 1) : setScore(score)
	}

	return (
		<div>
				<FormControl component="fieldset">
					<FormLabel component="legend">{eventQuestions[counter].question}</FormLabel>
					<RadioGroup value={value} onChange={inputHandler}>
					{eventQuestions[counter].answerOptions.map((answer) => {
						return (
						<FormControlLabel value={answer.isCorrect} control={<Radio />} label={answer.answer}
						 />) })}
					</RadioGroup>
				</FormControl>

				{/* // <RadioGroup aria-label="gender" name="gender1" value={eventId} >
				// 	{eventQuestions[counter].answerOptions.map((answer) => { */}
				{/* // 		return (<div>
				// 			<FormControlLabel onChange={inputHandler} value={answer.isCorrect} control={<Radio />} label={answer.answer} />
				// 		</div>)
				// 	})}
				// </RadioGroup> */}

			<button onClick={checkAnswer}>Next</button>
		</div>
	)

}

export default inject("EventsStore")(observer(QuizQuestion))