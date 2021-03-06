import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../Styles/SuggestionList.css";
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const SuggestionsList = inject("EventsStore")(
	observer((props) => {
		const [suggestionsList, setSuggestionsList] = useState([]);
		useEffect(() => {
			axios.get("http://localhost:4200/suggestions").then((res) =>
				setSuggestionsList(res.data)
			);
		}, []);

		const currentSuggetstion = (title) => {
			const data = suggestionsList.find((f) => f.title === title);
			props.EventsStore.currentSuggestionFunction(data);
		};

		const addStyleTo = useStyles();

		return (
			<div>
				<Link to='/home'>
					<Button
						style={{
							backgroundColor: "rgba(200,200,200,0.6)",
							margin:"1em"
						}}
					>
						Home
					</Button>
				</Link>
				<TableContainer component={Paper}>
					<Table className={addStyleTo.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell
									style={{
										fontSize: "2em",
										color: "rgba(200,200,200,0.8)",
									}}
								>
									User Name
								</TableCell>
								<TableCell
									style={{
										fontSize: "2em",
										color: "rgba(200,200,200,0.8)",
									}}
									align='right'
								>
									Title
								</TableCell>
								<TableCell
									style={{
										fontSize: "2em",
										color: "rgba(200,200,200,0.8)",
									}}
									align='right'
								>
									Submit
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{suggestionsList.map((row) => (
								<TableRow key={row.title}>
									<TableCell
										style={{
											fontSize: "1.4em",
											fontWeight: "bold",
											color: "rgba(60,60,60,1)",
										}}
										component='th'
										scope='row'
									>
										{row.userName}
									</TableCell>
									<TableCell
										style={{
											fontSize: "1.4em",
											fontWeight: "lighter",
											color: "rgba(60,60,60,1)",
										}}
										align='right'
									>
										{row.title}
									</TableCell>
									<TableCell align='right'>
										<Link to='/verifySuggestion'>
											<Button
												style={{
													backgroundColor:
														"rgba(200,200,200,0.8)",
												}}
												onClick={() =>
													currentSuggetstion(row.title)
												}
											>
												Check Suggestion
											</Button>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	})
);

export default SuggestionsList;
