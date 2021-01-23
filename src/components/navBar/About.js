import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from "react";
const About = () => {
	window.responsiveVoice.speak(
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa ipsum quam fugiat, vero error eum enim ab, architecto recusandae nemo velit minus earum maiores inventore debitis ex, nesciunt dignissimos quidem."
	);
	return (
		<div>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa ipsum quam fugiat,
			vero error eum enim ab, architecto recusandae nemo velit minus earum maiores
			inventore debitis ex, nesciunt dignissimos quidem.
		</div>
	);
};

export default About;
