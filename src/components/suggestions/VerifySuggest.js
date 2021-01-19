import axios from "axios";
import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import "date-fns";

import Button from "@material-ui/core/Button";

const VerifySuggest = inject("EventsStore")(
	observer((props) => {
		const [suggestion, setSuggestion] = useState({});
		useEffect(() => {
			setSuggestion(props.EventsStore.currentSuggestion);
		}, [props.EventsStore.currentSuggestion]);
		console.log(suggestion);

		const handleInputChange = ({ target }) => {
			let obj = {...suggestion};
			if (target.name === "startDate" || target.name === "endDate") {
				console.log(Number(target.value));
				obj[target.name] = Number(target.value);
			}else{
				obj[target.name] = target.value;
			}
			setSuggestion(obj);
		};
		return (
			<div>
				<React.Fragment>
					<CssBaseline />
					<Container maxWidth='sm'>
						<h4>Send us your (hi)story</h4>
						<div>
							<TextField
								name='title'
								id='standard-basic'
								label='Title'
								value={suggestion.title}
								onChange={handleInputChange}
							/>
							<br />
							<TextField
								name='countries'
								id='standard-basic'
								label='Country'
								value={suggestion.countries}
								onChange={handleInputChange}
							/>
							<br />
							<TextField
								name='startDate'
								type='nubmer'
								id='standard-basic'
								label='StartDate'
								value={suggestion.startDate}
								onChange={handleInputChange}
							/>
							<br />
							<TextField
								name='endDate'
								type='nubmer'
								id='standard-basic'
								label='EndDate'
								value={suggestion.endDate}
								onChange={handleInputChange}
							/>
							<div for='w3review'>Description</div>
							<textarea
								name='description'
								id='w3review'
								rows='15'
								cols='80'
								value={suggestion.description}
								onChange={handleInputChange}
							/>
							<div>
								<input type='file' />
								<button>Upload</button>
							</div>
							<div>
								<Button variant='contained'>Send</Button>
							</div>
							<button onClick={() => console.log(suggestion)}>Print</button>
						</div>
					</Container>
				</React.Fragment>
				);
			</div>
		);
	})
);

export default VerifySuggest;
