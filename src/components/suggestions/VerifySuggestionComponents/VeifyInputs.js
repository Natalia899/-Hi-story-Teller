import React from "react";
import TextField from "@material-ui/core/TextField";
import "date-fns";

export const InputsField = (props) => {
	return (
		<div className='inputs-field-container'>
			<TextField
				className='input-field'
				name='title'
				id='title'
				label='Title'
				value={props.suggestion.title}
				onChange={props.handleInputChange}
			/>
			<br />
			<TextField
				className='input-field'
				name='countries'
				id='countries-input'
				label='Country'
				value={props.suggestion.countries}
				onChange={props.handleInputChange}
			/>
			<br />
			<TextField
				className='input-field'
				name='startDate'
				type='nubmer'
				id='startDate'
				label='StartDate'
				value={props.suggestion.startDate}
				onChange={props.handleInputChange}
			/>
			<br />
			<TextField
				className='input-field'
				name='endDate'
				type='nubmer'
				id='endDate'
				label='EndDate'
				value={props.suggestion.endDate}
				onChange={props.handleInputChange}
			/>
		</div>
	);
};
