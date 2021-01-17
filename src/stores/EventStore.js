import { observable, computed, action, makeObservable } from 'mobx'
import axios from 'axios'


export class EventsStore {
    constructor() {
        this.events = []
        this.user = ''
        

        makeObservable(this, {
            events: observable,
            user: observable,
            
        })
    }


}

