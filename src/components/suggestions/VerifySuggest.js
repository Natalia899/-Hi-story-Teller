import axios from "axios";
import React, { useEffect, useState } from "react";

const EditSuggestions = () => {
	const [titleValue, setTitleValue] = useState();
	const [descriptionValue, setdescriptionValue] = useState();
	const [imagesValue, setImagesValue] = useState();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	useEffect(() => {
		axios.get();
	});

	return <input name='title' type='text' value={titleValue} />;
};
