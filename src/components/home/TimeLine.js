import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { inject, observer } from "mobx-react";
import "../Styles/TimeLine.css";

const useStyles = makeStyles({
	root: {
		width: "70vw",
		
	},
});

function TimeLine(props) {
	const classes = useStyles();

	function valuetext(value) {
		return `${value}`;
	}

	const handleChange = (event, newValue) => {
		props.EventsStore.setDateRange(newValue);
	};

	return (
		<div className={classes.root}>
			<div className='timeline-container'>
				<div className="subContainer" >
					<Typography id='range-slider' gutterBottom>
						<h3 className='timeline-header' >Timeline</h3>
					</Typography>

					<Slider
						className="slider"
						style={{
							color: "rgb(4,4,25)",
							width: "70vw",
						}}
						value={props.EventsStore.dateRange}
						onChange={handleChange}
						valueLabelDisplay='auto'
						aria-labelledby='range-slider'
						getAriaValueText={valuetext}
						min={1600}
						max={2000}
					/>
				</div>
			</div>
		</div>
	);
}

export default inject("EventsStore")(observer(TimeLine));
