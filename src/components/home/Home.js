
import TimeLine from './TimeLine'

import NavBar from '../navBar/NavBar'
import {MyGlobe} from './WorldMap'
import HomeButton from './HomeButton'

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
        </div>
    )
}

