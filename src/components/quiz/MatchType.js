import { inject, observer } from 'mobx-react';
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
const socketIOClient = require('socket.io-client');
const ENDPOINT = 'ws://localhost:4200';

export const Match = inject("EventsStore")(observer((props) => {
    const [inputValue, setInputValue] = useState("")
    const socket = socketIOClient(ENDPOINT)
    const createRoom = () => {
        console.log(props.EventsStore.user)
        socket.emit("createRoom", ({ inputValue: inputValue, id: props.EventsStore.user._id }))

    }
    useEffect(() => {
        const { _id, username } = props.EventsStore.user
        socket.emit("addUser", { _id, username })
    }, [])

    return (
        <div>
            <input type="text" value={inputValue} onChange={({ target }) => setInputValue(target.value)} />
            <button style={{
                width: "6em",
                height: "3em",
            }}
                onClick={createRoom}
            >
                Creat Room
            </button>
            <select name="" id="">
                <option value=""></option>
            </select>
        </div>
    )
}));