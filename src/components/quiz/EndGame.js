import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button } from "@material-ui/core";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import '../Styles/EndGame.css'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(20),
            marginLeft: theme.spacing(50),
            width: theme.spacing(20),
            height: theme.spacing(10),
            backgroundColor: "rgb(247, 255, 247)",
            padding: '5%',
            color: 'rgb(73, 80, 87)',
            fontSize: 'large',
        },
    },
    outerContainer: {

        '& > *': {
            backgroundColor: "rgba(80,80,80,0.2)",
            height: "100vh",
            width: "100vw",
        },
    }
}));

function EndGame(props) {
    const classes = useStyles();

    const { score } = props.EventsStore

    const calcScore = () => {
        let sum = 0
        for (let key in score) {
            sum += score[key]
        }
        return sum
            
        
    }
    return (

        <div className={classes.outerContainer}>

            <div style={{ height: '10%', padding: '3%' }}> <Link to='/home'>
                <Button
                    variant='contained'
                    color='primary'
                >
                    Back
					</Button>
            </Link></div>

            <div className="outerContainer" >
                <div className="container" >
                    <h1 className="mainHeader" >(Hi)story Player</h1>
                    <h3 className="subHeader" >that was a nice story...</h3>
                    <p className="p-1" >
                        <span className="hint" >your score is :</span><span className="score" >{calcScore()}</span>
                    </p>
                </div>
            </div>

            {/* <div className={classes.root}>
                <Paper elevation={3} >
                    Your score is:
                 {calcScore()}
                </Paper>
            </div> */}
        </div>
    );
}
export default inject("EventsStore")(observer(EndGame))