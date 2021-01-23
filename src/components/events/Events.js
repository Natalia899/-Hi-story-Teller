import { Link } from 'react-router-dom';
import { inject, observer} from 'mobx-react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react'

function Events(props){
    let {events} = props.EventsStore

    console.log(events)

    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
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

            <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            </FormControl>
  
        </div>
    )
}

export default inject("EventsStore")(observer(Events))