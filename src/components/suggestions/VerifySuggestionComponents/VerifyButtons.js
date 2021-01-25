import React from "react";
import { Link } from "react-router-dom";
import "date-fns";
import Button from "@material-ui/core/Button";

export const VerifyButtons = (props) => {
	return (
		<>
			<Link to='/suggestionsList'>
				<Button
					onClick={() => props.EventsStore.approveSuggestion(props.suggestion._id)}
				>
					APPROVE
				</Button>
			</Link>
			<Link to='/suggestionsList'>
				<Button
					onClick={() => props.EventsStore.deleteSuggestion(props.suggestion._id)}
				>
					Reject
				</Button>
			</Link>
		</>
	);
};
