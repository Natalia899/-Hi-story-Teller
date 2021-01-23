import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import "date-fns";

import Button from "@material-ui/core/Button";
import { set } from "mobx";

const VerifySuggest = inject("EventsStore")(
	observer((props) => {
		const [suggestion, setSuggestion] = useState({});
		const [descriptionImage, setDescriptionImage] = useState("");
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
		const url = "https://api.cloudinary.com/v1_1/domephsm4/image/upload"; // link to cloudinary
		const preset = "natalia"; // where we save all the images // url

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
								{suggestion.gallery &&
									suggestion.gallery.map((m, index) => (
										<div>
											<input
												onChange={({ target }) => {
													let obj = { ...suggestion };
													obj.gallery[index].imageTitle =
														target.value;
													obj.gallery[index].imageURL =
														m.imageURL;
													setSuggestion(obj);
												}}
												value={m.imageTitle}
												type='text'
											/>
											<br />

											<img
												width='300px'
												height='300px'
												src={m.imageURL}
												alt=''
											/>

											<br />

											<Button
												onClick={() => {
													let obj = { ...suggestion };
													obj.gallery.splice(index, 1);
													setSuggestion(obj);
												}}
											>
												DELETE
											</Button>
										</div>
									))}
							</div>
							<div>
								<input
									onChange={({ target }) => {
										setURLImage(target.files[0]);
									}}
									type='file'
								/>
								<input
									onChange={({ target }) =>
										setDescriptionImage(target.value)
									}
									value={descriptionImage}
									type='text'
									placeholder='Description'
								/>
								<Button
									onClick={async () => {
										const formData = new FormData();
										formData.append("file", URLImage); // file equls to type
										formData.append("upload_preset", preset);

										try {
											const res = await axios.post(url, formData);
											const imageUrl = res.data.secure_url;
											let obj = { ...suggestion };
											obj.gallery.push({
												id: res.data.public_id,
												imageTitle: descriptionImage,
												imageURL: imageUrl,
											});
											setSuggestion(obj);
										} catch (err) {
											console.log(err);
										}
									}}
								>
									Upload
								</Button>
							</div>
							<Link to='/suggestionsList'>
								<Button
									onClick={() =>
										props.EventsStore.approveSuggestion(
											suggestion._id
										)
									}
								>
									APPROVE
								</Button>
							</Link>
							<Link to='/suggestionsList'>
								<Button
									onClick={() =>
										props.EventsStore.deleteSuggestion(suggestion._id)
									}
								>
									Reject
								</Button>
							</Link>
						</div>
					</Container>
				</React.Fragment>
				);
			</div>
		);
	})
);

export default VerifySuggest;
