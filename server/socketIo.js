const express = require("express");
const router = express.Router();

class Socket {
    constructor() {
        this.users = []

    }

    addUser({ _id, username, score = 0 }) {
        if (_id, username) {
            let user = { _id, username, score }
            this.users.push(user)
            console.log(this.users)
            return user
        }

    }

    increaseUserScore(id) {
        this.users.find(user => user.id === id).score++
    }

    removeUser(id) {
        const index = this.users.findIndex(user => user.id === id)

        return this.users.splice(index, 1)[0]
    }




    // checkAnswer (question, answer) {
    //     for(let i in this.questions){
    //         if(i === question){
    //             answer 
    //         }
    //     }
    // }


    // checkRooms = (user, rooms) => {
    //     const roomWithSpace = rooms.find(room => room < 2 )
    //     if(roomWithSpace){

    //     }
    //     if(!roomWithSpace){
    //         room = {room: "room2"}
    //         room.push(user)
    //     }
    // }
}

module.exports = Socket



