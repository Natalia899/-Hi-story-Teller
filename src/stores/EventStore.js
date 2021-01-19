import { observable, computed, action, makeObservable } from "mobx";
import axios from "axios";
export class EventsStore {
	constructor() {
		this.events = [];
		this.user = null;
		this.dateRange = [1600, 2000];
		this.countries = [];
		this.currentSuggestion = {};

		makeObservable(this, {
			events: observable,
			user: observable,
			dateRange: observable,
			setDateRange: action,
			countries: observable,
            currentSuggestion: observable,
            currentSuggestionFunction:action
		});
	}

	setDateRange = (val) => {
		this.dateRange = val;
	};

	userLogin = async (user) => {
		const data = await axios.post("http://localhost:4200/login", user);
		if (data.data) {
			this.user = data.data;
			console.log(this.user);
		} else {
			alert("username or password is not correct");
		}
    };
    
    currentSuggestionFunction = (suggestion) => {
        console.log(suggestion)
        this.currentSuggestion = suggestion
    }
}
