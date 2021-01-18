import { observable, computed, action, makeObservable } from "mobx";
import axios from 'axios'
export class EventsStore {

	
    constructor() {
        this.events = []
        this.user = null
        this.dateRange = [1600, 2000]
        this.countries = [];

        makeObservable(this, {
            events: observable,
            user: observable,
            dateRange: observable,
            setDateRange: action,
            countries: observable
        })
    }

    setDateRange = (val) => {
        this.dateRange = val
    }

    userLogin = async (user) => {
        console.log(user)
        const data = await axios.post("http://localhost:4200/login", user)
        console.log(data.data)
        if(data.data){
            this.user = data.data
            console.log(this.user)
        }else{
            
        }
        
    }
}
