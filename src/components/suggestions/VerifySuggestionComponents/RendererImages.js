import React, {  } from "react";
import "date-fns";
import Button from "@material-ui/core/Button";

export const RendererImages = (props) => {
	let suggestion = props.suggestion
	return(
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
															props.setSuggestion(obj);
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
															props.setSuggestion(obj);
														}}
													>
														DELETE
													</Button>
												</div>
											))}
									</div>
	)
}