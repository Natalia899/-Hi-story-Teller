import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Event.css";

function Event(props) {
	let { events } = props.EventsStore;
	const eventId = props.match.params.id;
	const user = props.EventsStore.user.username;

	console.log(eventId);
	let event = events.find((event) => event._id === eventId);
	console.log(event);

	const useStyles = makeStyles((theme) => ({
		root: {
			"& > *": {},
			width: "100%",
			alignContent: "center",
			heading: {
				display: "grid",
				fontSize: theme.typography.pxToRem(15),
				fontWeight: theme.typography.fontWeightRegular,
				justifySelf: "center",
			},
			HomeButton: {
				"& > *": {
					color: "rgba(200,200,200,0.8)",
					marginTop: "1em",
					marginLeft: "1em",
				},
			},
		},
	}));

	const classes = useStyles();

	return (
		<div className='container'>
			<div className={classes.root}>
				<Link to='/events'>
					<Button
						style={{
							marginTop: "1em",
							marginLeft: "1em",
						}}
						variant='contained'
						color='primary'
					>
						Back
					</Button>
				</Link>
			</div>

			<h1
				style={{
					color: "rgba(80,80,80,1)",
				}}
			>
				{event.title}
			</h1>
			<h2
				style={{
					color: "rgba(80,80,80,0.6)",
				}}
			>
				{event.startDate} - {event.endDate}
			</h2>

			<div className='gallery'>
				<div id='carousel'>
					{event.gallery.map((image) => {
						return (
							<figure
								style={{
									display: "grid",
									justifyContent: "center",
									alignItems: "center",
									width: "350px",
									height: "350px",
									backgroundImage: `url(${image.imageURL})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									outline: "1px solid",
								}}
							>
								<h2
									style={{
										display: "grid",
										height: "100%",
										color: "rgba(80,80,80,1)",
									}}
								>
									{image.imageTitle}
								</h2>
							</figure>
						);
					})}
				</div>
			</div>

			<p
				style={{
					display: "grid",
					justifyContent: "start",
					fontSize: "1.4em",
					lineHeight: "1.4em",
					fontFamily: `"Neuton", serif`,
					paddingLeft: "9em",
					fontWeight: "lighter",
					color: "rgba(80,80,80,1)",
					maxWidth: "1000px",
				}}
				className='description'
			>
				{event.description}
			</p>

			<div className={classes.root}>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<div
							style={{
								display: "grid",
								justifyContent: "center",
							}}
						>
							<Typography className={classes.heading}>
								Share your thoughts!
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							<label>user name: {user}</label>
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
}

export default inject("EventsStore")(observer(Event));
