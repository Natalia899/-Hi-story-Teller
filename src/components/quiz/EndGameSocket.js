import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
const socketIOClient = require('socket.io-client');
const ENDPOINT = 'ws://localhost:4200';

function EndGameSocket(props) {
    const [results, setResults] = useState(null)
    const socket = socketIOClient(ENDPOINT)
    useEffect(() => {
        socket.emit("getUsers", "true")

    }, [])

    socket.on("users", data => setResults(data))
    console.log(results)

    return (
        <div>
            {results && results.map(m => {
               return  <h3 className='userScore'> {m.username} - {m.score} </h3>
            })}
        </div>
    )
}

export default inject("EventsStore")(observer(EndGameSocket))