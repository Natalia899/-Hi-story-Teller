import React from "react";
import { Link } from "react-router-dom";
import "date-fns";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";


export const VerifyButtons = inject("EventsStore")(observer((props) => {
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
}))

