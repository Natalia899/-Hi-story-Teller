import axios from "axios";
import React from "react";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import Button from "@material-ui/core/Button";

export const UploadImages = (props) => {
	return (
		<>
			<TextField
				className='input-file'
				onChange={({ target }) => {
					props.setURLImage(target.files[0]);
				}}
				type='file'
			/>
			<TextField
				className='imageDescripation-input'
				onChange={({ target }) => props.setDescriptionImage(target.value)}
				value={props.descriptionImage}
				type='text'
				placeholder='Description'
			/>
			<Button
				id='upload-button'
				onClick={async () => {
					const formData = new FormData();
					formData.append("file", props.URLImage); // file equls to type
					formData.append("upload_preset", props.preset);

					try {
						const res = await axios.post(props.url, formData);
						const imageUrl = res.data.secure_url;
						let suggestion = props.suggestion
						let obj = { ...suggestion };
						obj.gallery.push({
							id: res.data.public_id,
							imageTitle: props.descriptionImage,
							imageURL: imageUrl,
						});
						props.setSuggestion(obj);
					} catch (err) {
						console.log(err);
					}
				}}
			>
				Upload
			</Button>
		</>
	);
};
