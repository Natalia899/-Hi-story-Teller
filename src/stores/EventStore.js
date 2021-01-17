import { observable, computed, action, makeObservable } from 'mobx'
import axios from 'axios'

export class EventsStore {
    constructor() {
        this.events = []
        this.user = ''
        this.dateRange = [0, 300]

        makeObservable(this, {
            events: observable,
            user: observable,
            dateRange: observable,
            setDateRange: action
        })
    }

    setDateRange = (val) => {
        // console.log(this.dateRange)
        this.dateRange = val
    }

}

