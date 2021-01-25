import React, { useEffect, useState } from "react";
import TimeLine from './TimeLine'
import NavBar from '../navBar/NavBar'
import {MyGlobe} from './WorldMap'
import HomeButton from './HomeButton'
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom'
const socketIOClient = require('socket.io-client');
const ENDPOINT = 'ws://localhost:4200'

export function Home(){

    return(
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <MyGlobe />
            </div>
            <div>
                <TimeLine /> 
            </div>
            <div>
                <HomeButton />
            </div>
              <Link to='/quiz'><StarIcon /></Link>
        </div>
    )
}

