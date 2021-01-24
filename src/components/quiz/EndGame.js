import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';

function EndGame(props) {
    console.log(props.EventsStore.score)
    const {score} = props.EventsStore

    const calcScore = () => {
        let sum = 0
        for(let key in score){
            sum += score[key]
        }

        return(
            <div>
                {sum}
            </div>
        )
    }

    return (
        <div>
            Your score is:
            {calcScore()}
        </div>
    )
}

export default inject("EventsStore")(observer(EndGame))