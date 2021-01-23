import { observable, computed, action, makeObservable } from "mobx";
import axios from "axios";
export class EventsStore {
	constructor() {
		this.events = [];
		this.user = null;
		this.dateRange = [1600, 2000];
		this.countries = [];
		this.currentSuggestion = {};
		this.quiz = [];

		makeObservable(this, {
			events: observable,
			user: observable,
			dateRange: observable,
			countries: observable,
			currentSuggestion: observable,
			eventsRender: action,
			setDateRange: action,
			addCountriesToStore: action,
			currentSuggestionFunction: action,
			approveSuggestion: action,
			deleteSuggestion: action,
			quiz:observable,
			getQuiz: action
		});
	}

	setDateRange = (val) => {
		this.dateRange = val;
	};

	userLogin = async (user) => {
		const data = await axios.post("http://localhost:4200/login", user);
		if (data.data) {
			this.user = data.data;
		} else {
			alert("username or password is not correct");
		}
	};

	currentSuggestionFunction = (suggestion) => {
		console.log(suggestion);
		this.currentSuggestion = suggestion;
	};
	addCountriesToStore = (country) => {
		this.countries.push(country);
		console.log(this.countries);
	};

	eventsRender = async () => {
		const countries = this.countries;
		const startDate = this.dateRange[0];
		const endDate = this.dateRange[1];
		const eventsData = { startDate, endDate, countries };
		let data = await axios.post("http://localhost:4200/events", eventsData);
		data = data.data;
		for (let i of data) {
			for (let j of i) {
				this.events.push(j);
			}
		}
		console.log(this.events);
	};
	approveSuggestion = async (id) => {
		await axios.put(`http://localhost:4200/event/${id}`);
	};
	deleteSuggestion = async (id) => {
		await axios.delete(`http://localhost:4200/event/${id}`);
	};

	getQuiz = async () => {
	let result = await axios.get('http://localhost:4200/quiz')
	this.quiz = result.data

	}
}
