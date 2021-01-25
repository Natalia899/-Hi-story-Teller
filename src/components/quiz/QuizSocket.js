
import { inject, observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import axios from "axios"
const socketIOClient = require('socket.io-client');
const ENDPOINT = 'ws://localhost:4200';

function QuizSocket(props) {
	console.log('are u here??????')
	const [counter, setCounter] = useState(1)
	const [score, setScore] = useState({})

	const { quiz } = props.EventsStore
	const eventId = props.match.params.eventId
	const eventQuestions = quiz.find(q => { return q.id === eventId }).quiz
	console.log(eventQuestions)

	const inputHandler = (event) => {
		const choice = event.target.value
		console.log(event.target.value)

		const result = eventQuestions[counter - 1].answerOptions.
			find(ans => ans.answer === choice).isCorrect
		if (result === true) {
			let newScore = { ...score }
			newScore[counter] = 1
			setScore(newScore)
		} else {
			let newScore = { ...score }
			newScore[counter] = 0
			setScore(newScore)
		}
	}

	useEffect(() => {
		console.log(props.EventsStore.user)
		const socket = socketIOClient(ENDPOINT)
		const { _id, username } = props.EventsStore.user
		console.log(_id)
		console.log(username)
		socket.emit("addUser", { _id, username })
	}, [])


	const quizScore = () => {
		props.EventsStore.quizScore(score)
	}

	console.log(score)

	const checkAnswer = () => {
		setCounter(counter + 1)
	}

	// const [response, setResponse] = useState("");

	// console.log(response)
	// useEffect(() => {
	// 	const socket = socketIOClient(ENDPOINT);
	// 	console.log(socket)
	// 	socket.on("FromAPI", data => {
	// 		setResponse(data); 
	// 	})
	// }, []);


	return (
		<div>
			<FormControl component="fieldset">
				<FormLabel component="legend">{eventQuestions[counter - 1].question}</FormLabel>
				<RadioGroup onChange={inputHandler}>
					{eventQuestions[counter - 1].answerOptions.map(({ answer }) => {
						return (
							<FormControlLabel value={answer} control={<Radio />} label={answer}
							/>)
					})}
				</RadioGroup>
			</FormControl>
			<div>
				{counter === 10 ?
					<Link to="/endGame">
						<button onClick={quizScore}>End Game</button>
					</Link> : <button onClick={checkAnswer}>Next</button>}
			</div>

		</div>
	)

}

export default inject("EventsStore")(observer(QuizSocket))