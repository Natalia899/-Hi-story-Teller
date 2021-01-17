
import TimeLine from './TimeLine'

import NavBar from '../navBar/NavBar'
import {MyGlobe} from './WorldMap'


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
        </div>
    )
}

