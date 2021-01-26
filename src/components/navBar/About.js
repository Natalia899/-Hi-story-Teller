import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../Styles/About.css";
import NavBar from "./NavBar";

const Text =
	"HI STORY TELLER. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illumperspiciatis voluptatibus consequuntur nobis enim harum blanditiisducimus iusto, neque sed cum inventore. Voluptates a quae nihilrepellendus qui voluptate ad.";

const SupportTextButton = "click to hear About us.";
const SupportStopButton = "click to stop the speaker.";

const Speaker = (text, voice) => {
	window.responsiveVoice.speak(text, voice, { volume: 0.3 });
};

const StopSpeaker = () => {
	window.responsiveVoice.cancel();
};

const About = () => {
	return (
		<div className='outerContainer'>
			<NavBar />
			<div className='container'>
				<div className='textBorderContainer'>
					<h1 className='mainHeader'>(Hi)Story Teller</h1>
					<div className='buttonSpeakerContainer'>
						<Button
							onClick={() => Speaker(Text, "Australian Male")}
							onMouseEnter={() =>
								Speaker(SupportTextButton, "Australian Male")
							}
							className='speak'
						>
							Speak
						</Button>
						<Button
							onClick={StopSpeaker}
							className='stopSpeak'
							onMouseEnter={() =>
								Speaker(SupportStopButton, "Australian Male")
							}
						>
							Stop
						</Button>
					</div>
					<p className='p-1'>
						<h3 className='header-1'>Little about us</h3>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
						perspiciatis voluptatibus consequuntur nobis enim harum blanditiis
						ducimus iusto, neque sed cum inventore. Voluptates a quae nihil
						repellendus qui voluptate ad.
					</p>
					<p className='p-2'>
						<h4 className='header-2'>Our Company</h4>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
						perspiciatis voluptatibus consequuntur nobis enim harum blanditiis
						ducimus iusto, neque sed cum inventore. Voluptates a quae nihil
						repellendus qui voluptate ad.
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
