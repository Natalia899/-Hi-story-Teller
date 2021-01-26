const express = require("express");
const router = express.Router();

class Socket {
    constructor() {
        this.users = []
        this.rooms = {}

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
        this.users.find(user => user._id === id).score++

    }

    removeUser(id) {
        const index = this.users.findIndex(user => user.id === id)

        return this.users.splice(index, 1)[0]
    }

    createRoom({inputValue, id}) {
        console.log(this.users)
        let user = this.users.find(m => m._id == id)
        console.log(user)
        console.log(id)
        this.rooms[inputValue] = [user]
        console.log(this.rooms)
    }

    joinRoom(inputValue, id, username, score) {
        if (this.rooms[inputValue] && this.rooms[inputValue].length < 2) {
            let user = { id, username, score }
            this.rooms[inputValue].push(user)
        } else if(this.rooms[inputValue] && this.rooms[inputValue].length > 2) {
            return { error: "Room is full " }
        }else{
            return {error: `This room doesn't exist`}
        }

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

module.exports = Socket;
