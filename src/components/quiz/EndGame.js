
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./EndGame.css";
function EndGame(props) {
	const { score } = props.EventsStore;
	const calcScore = () => {
		let sum = 0;
		for (let key in score) {
			sum += score[key];
		}
		return sum;
	};
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
			}}
		>
			<div style={{ height: "10%", padding: "3%" }}>
				<Link to='/home'>
					<Button variant='contained' color='primary'>
						Back
					</Button>
				</Link>
			</div>
			<div className='endGameOuterContainer'>
				<div className='container1'>
					<h1 className='mainHeader'>(Hi)story Player</h1>
					<h3 className='subHeader'>that was a nice story...</h3>
					<p className='p-1'>
						<span className='hint'>your score is :</span>
						<span className='score'>{calcScore()}</span>
					</p>
				</div>
			</div>
		</div>
	);
}
export default inject("EventsStore")(observer(EndGame));

