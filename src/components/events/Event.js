import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./Event.css"

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TextField } from '@material-ui/core';
import axios from 'axios';



function Event(props) {
    let { events } = props.EventsStore
    const eventId = props.match.params.id
    const user = props.EventsStore.user.username

    let event = events.find(event => event._id === eventId)

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {

                margin: theme.spacing(1)
            },
            width: '100%',
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            }
        }
    }));


    const [input, setInput] = useState("")
    const [comments, setComments] = useState([])

    const inputHandler = (event) => {
        setInput(event.target.value)
    }

    const shareComment = (input) => {
        let newComment = {comment: input, time: new Date(), username: user}
        setComments([...comments, newComment])
        props.EventsStore.addingComment(newComment, event._id)
        setInput("")
    }

    const classes = useStyles();

    return (
        <div className="idan">
            <div className={classes.root}>
                <Link to="/events" >
                    <Button variant="contained" color="primary">
                        Back
                    </Button>
                </Link>
            </div>

            <h1>{event.title}</h1>
            <h2> {event.startDate} - {event.endDate}</h2>

            <div className="gallery">
                <div id="carousel">
                    {event.gallery.map(image => {
                        return (
                            <figure>
                                <div>
                                    <img src={image.imageURL} alt="" width="300px" height="300px" />
                                    <figcaption>{image.imageTitle}</figcaption>
                                </div>
                            </figure>
                        )
                    })}
                </div>
            </div>

            <p className="description">
                {event.description}
            </p>

            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <div style={{ 
                        display:"grid",
                        justifyContent:"center",
                    }} >

                    <div>
                        <Typography className= {classes.heading}>
                            Share your thoughts!
                        </Typography>
                    </div>

                    </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <label>user name: {user}</label>

                            <TextField
                            id="outlined-full-width"
                            label="type"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            onChange={inputHandler}
                            value={input}
                          />

                            <Button  onClick={() => shareComment(input)} size='small' variant="contained" color="secondary">
                                Send!
                            </Button>
                        </Typography>
                    </AccordionDetails>
                    {comments ? comments.map(c => {return (
                        <div>
                            <div>
                                user: {c.username}
                            </div>
                            <div>
                                time: {c.time.toDateString().slice(3)}
                            </div>
                            <div>
                                comment: {c.comment}
                            </div><br></br>
                        </div>
                    )}): null}

                </Accordion>
            </div>
        </div>
    )
}

export default inject("EventsStore")(observer(Event))