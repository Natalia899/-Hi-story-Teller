import { inject, observer} from 'mobx-react';


function Events(props){
    const {countries, dateRange} = props.EventsStore
    console.log(countries, dateRange)
    
    return(
        <div>
            hissssssssssssssssss
        </div>
    )

}

export default inject("EventsStore")(observer(Events))