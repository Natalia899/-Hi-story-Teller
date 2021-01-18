import { observable, computed, action, makeObservable } from "mobx";

export class EventsStore {
	constructor() {
		this.events = [];
		this.user = {};
		this.dateRange = [0, 300];
		this.countries = [];

		makeObservable(this, {
			events: observable,
			user: observable,
			dateRange: observable,
			setDateRange: action,
			countries: observable,
		});
	}

	setDateRange = (val) => {
		//console.log(this.dateRange)
		this.dateRange = val;
	};
}
