import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import "date-fns";
import "../Styles/VerifySuggestions.css";
import { InputsField } from "./VerifySuggestionComponents/VeifyInputs";
import { UploadImages } from "./VerifySuggestionComponents/UploadImages";
import { RendererImages } from "./VerifySuggestionComponents/RendererImages";
import { VerifyButtons } from "./VerifySuggestionComponents/VerifyButtons";

const VerifySuggest = inject("EventsStore")(
	observer((props) => {
		const [suggestion, setSuggestion] = useState({});
		const [descriptionImage] = useState("");
		const [URLImage, setURLImage] = useState("");
		useEffect(() => {
			setSuggestion(props.EventsStore.currentSuggestion);
		}, [props.EventsStore.currentSuggestion]);

		const handleInputChange = ({ target }) => {
			let obj = { ...suggestion };
			if (target.name === "startDate" || target.name === "endDate") {
				console.log(Number(target.value));
				obj[target.name] = Number(target.value);
			} else {
				obj[target.name] = target.value;
			}
			setSuggestion(obj);
		};
		const url = "https://api.cloudinary.com/v1_1/domephsm4/image/upload";
		const preset = "natalia";

		return (
			<div>
				<React.Fragment>
					<CssBaseline />
					<Container maxWidth='sm'>
						<h2>Administrator Editor</h2>
						<hr />
						<div>
							<InputsField
								suggestion={suggestion}
								handleInputChange={handleInputChange}
							/>
							<div for='w3review'>
								<h3>Description</h3>
							</div>
							<div className='layout-verify-page'>
								<div>
									<textarea
										name='description'
										className='text-area'
										rows='15'
										cols='60'
										style={{
											lineHeight: "2em",
										}}
										onChange={handleInputChange}
										value={suggestion.description}
									></textarea>
								</div>
								<div className='sapce-and-gap'>
									<UploadImages
										setURLImage={setURLImage}
										descriptionImage={descriptionImage}
										URLImage={URLImage}
										preset={preset}
										url={url}
										suggestion={suggestion}
										setSuggestion={setSuggestion}
									/>
									<RendererImages
										suggestion={suggestion}
										setSuggestion={setSuggestion}
									/>
								</div>
							</div>
							<VerifyButtons suggestion={suggestion} />
						</div>
					</Container>
				</React.Fragment>
				);
			</div>
		);
	})
);

export default VerifySuggest;
