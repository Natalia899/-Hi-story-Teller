import { inject, observer} from 'mobx-react';


function Events(props){
    const {events} = props.EventsStore
    console.log(events)
    


    
    return(
        <div>
            
            hissssssssssssssssss
        </div>
    )
}

export default inject("EventsStore")(observer(Events))