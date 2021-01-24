import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import "../Styles/VerifySuggestions.css";
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
						<h2>Administrator Editor</h2>
						<hr />
						<div>

							<div className='inputs-field-container'>
								<TextField
									className='input-field'
									name='title'
									id='title'
									label='Title'
									value={suggestion.title}
									onChange={handleInputChange}
								/>
								<br />
								<TextField
									className='input-field'
									name='countries'
									id='countries-input'
									label='Country'
									value={suggestion.countries}
									onChange={handleInputChange}
								/>
								<br />
								<TextField
									className='input-field'
									name='startDate'
									type='nubmer'
									id='startDate'
									label='StartDate'
									value={suggestion.startDate}
									onChange={handleInputChange}
								/>
								<br />
								<TextField
									className='input-field'
									name='endDate'
									type='nubmer'
									id='endDate'
									label='EndDate'
									value={suggestion.endDate}
									onChange={handleInputChange}
								/>
							</div>
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
									<TextField
										className='input-file'
										onChange={({ target }) => {
											setURLImage(target.files[0]);
										}}
										type='file'
									/>
									<TextField
									className="imageDescripation-input"
										onChange={({ target }) =>
											setDescriptionImage(target.value)
										}
										value={descriptionImage}
										type='text'
										placeholder='Description'
									/>
									<Button
										id="upload-button"
										onClick={async () => {
											const formData = new FormData();
											formData.append("file", URLImage); // file equls to type
											formData.append("upload_preset", preset);

											try {
												const res = await axios.post(
													url,
													formData
												);
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
									<div>
										{suggestion.gallery &&
											suggestion.gallery.map((m, index) => (
												<div>
													<input
														onChange={({ target }) => {
															let obj = {
																...suggestion,
															};
															obj.gallery[
																index
															].imageTitle =
																target.value;
															obj.gallery[
																index
															].imageURL = m.imageURL;
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
															let obj = {
																...suggestion,
															};
															obj.gallery.splice(
																index,
																1
															);
															setSuggestion(obj);
														}}
													>
														DELETE
													</Button>
												</div>
											))}
									</div>
								</div>
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
