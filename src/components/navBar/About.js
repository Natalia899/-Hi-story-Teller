import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import { Button } from "@material-ui/core";

const TEXT = `Hi story teller 
I want to tell you why. 
why history application.   
in the internet we have so much things to learn 	
we want to make are cliens have fun with learning  
our clients give us some stuff to work on that we 
will execute that in the most beutifall vertion. 
think you...story teller`;

const About = () => {
	return (
		<div>
			<Button
				style={{
					backgroundColor: "rgba(200,200,200,0.5)",
					margin: "1em",
				}}
				onClick={() => window.responsiveVoice.speak(TEXT)}
			>
				Play
			</Button>
			<div
				style={{
					display: "grid",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "grid",
						width: "70vw",
						height: "100vh",
						justifyContent: "center",
					}}
				>
					<h1>Hi We (Hi)story teller</h1>
					<hr
						style={{
							height: "1px",
						}}
					/>
					<p>
						(Hi)story teller I want to tell you why <br />
						why history application. <br />
						in the internet we have so much things to learn <br />
						we want to make are cliens have fun with learning <br />
						our clients give us some stuff to work on that we <br />
						will execute that in the most beutifall vertion. <br />
						TY...story teller
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
