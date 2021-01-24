import React, { useState } from "react";
import { CssBaseline, Container, TextField, Grid, Button } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { inject, observer } from "mobx-react";
import axios from "axios";
import { Link } from "react-router-dom";
import UploadImages from "./UploadImages";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	inputTitle: {
		"& > *": {
			fontSize: "24px",
			fontWeight: "bold",
			fontFamily: ` "Neuton", serif`,
		},
	},
	inputCountries: {
		"& > *": {
			fontSize: "24px",
			fontWeight: "lighter",
			fontFamily: `"Neuton", serif`,
		},
	},
	gridCointer: {
		"& > *": {
			display: "grid",
			justifyContent: "start",
		},

		mainGridContainer: {
			"& > *": {
				display: "grid",
				gridTemplateColumns: "repeat(2,1fr)",
			},
		},
	},
}));

function AddSuggestion(props) {
	const [selectedStartDate, setStartSelectedDate] = useState(new Date());
	const [selectedEndDate, setEndSelectedDate] = useState(new Date());
	const [gallery, setGallery] = useState([]);
	const [inputs, setInputs] = useState({ title: "", countries: [], description: "" });
	const classes = useStyles();

	const updateGallery = (updatedGallery) => {
		setGallery(updatedGallery);
	};

	const inputsHandler = ({ target }) => {
		let tempObj = { ...inputs };
		tempObj[target.name] = target.value;
		setInputs(tempObj);
	};

	const sendNewEvent = async () => {
		let newEvent = {
			title: `${inputs.title}, ${selectedStartDate
				.toDateString()
				.slice(3)} - ${selectedEndDate.toDateString().slice(3)} `,
			startDate: selectedStartDate.getFullYear(),
			endDate: selectedEndDate.getFullYear(),
			description: inputs.description,
			countries: [inputs.countries],
			gallery: gallery,
			username: props.EventsStore.user.username,
		};
		await axios.post("http://localhost:4200/event", newEvent);
	};
	return (
		<>
			<div
				style={{
					marginTop: "1em",
					marginLeft: "1em",
				}}
			>
				<Link to='/home'>
					<Button
						style={{
							fontWeight: "bold",
							fontSize: "4em",
							backgroundColor: "rgba(200,200,200,0.2)",
							width: "0.8em",
						}}
					>
						<h1
							style={{
								fontSize: "0.7em",
							}}
						>
							Home
						</h1>
					</Button>
				</Link>
			</div>
			<div
				style={{
					marginLeft: "10em",
				}}
			>
				<CssBaseline />
				<h4>Send us your (hi)story</h4>
				<div>
					<div id='container' className={classes.gridCointer}>
						<TextField
							className={classes.inputTitle}
							name='title'
							id='standard-basic'
							label='Title'
							onChange={inputsHandler}
							value={inputs.title}
						/>{" "}
						<br />
						<TextField
							className={classes.inputCountries}
							name='countries'
							id='standard-basic'
							label='Countries'
							onChange={inputsHandler}
							value={inputs.countries}
						/>
						<MuiPickersUtilsProvider
							utils={DateFnsUtils}
							onChange={inputsHandler}
						>
							<Grid container justify='space-around'>
								<KeyboardDatePicker
									name='startDate'
									disableToolbar
									variant='inline'
									format='MM/dd/yyyy'
									margin='normal'
									id='date-picker-inline'
									label='Start date'
									minDate='Date(1600-01-01)'
									value={selectedStartDate}
									onChange={(date) => setStartSelectedDate(date)}
									KeyboardButtonProps={{
										"aria-label": "change date",
									}}
								/>
								<KeyboardDatePicker
									name='endDate'
									margin='normal'
									id='date-picker-dialog'
									label='End date'
									format='MM/dd/yyyy'
									minDate='Date(1600-01-01)'
									value={selectedEndDate}
									onChange={(date) => setEndSelectedDate(date)}
									KeyboardButtonProps={{
										"aria-label": "change date",
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</div>
					<div
						style={{
							fontSize: "1.5em",
							letterSpacing: "0.2em",
							fontWeight: "lighter",
							fontFamily: `"Neuton", serif`,
						}}
						for='w3review'
					>
						Description
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "2fr 2fr",
							gap: "3em",
						}}
					>
						<>
							<textarea
								style={{
									fontWeight: "lighter",
									fontFamily: `"Neuton", serif`,
									fontSize: "24px",
								}}
								name='description'
								id='w3review'
								rows='15'
								cols='80'
								value={inputs.description}
								onChange={inputsHandler}
							/>
						</>
						<>
							<UploadImages updateGallery={updateGallery} />
							<Button
								style={{
									width: "3em",
								}}
								onClick={sendNewEvent}
								variant='contained'
							>
								Send
							</Button>
						</>
					</div>
				</div>
			</div>
		</>
	);
}
export default inject("EventsStore")(observer(AddSuggestion));
