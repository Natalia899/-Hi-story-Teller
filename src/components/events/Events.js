import { Link } from 'react-router-dom';
import { inject, observer} from 'mobx-react';
import Event from './Event'
import { useEffect, useState } from 'react';



function Events(props){
    let {events} = props.EventsStore

    console.log(events)
    
    return(
        <div>
         { events.map(event => {return(

            <div> 

                <h1>
                    {event.title}
                </h1>
                
                <Link to={`/event/${event._id}`}>
                    {console.log(`${event._id}`)}
                    <img src={event.gallery[0].imageURL} alt='' />
                </Link>
            </div>
            )})}

        </div>
    )
}

export default inject("EventsStore")(observer(Events))