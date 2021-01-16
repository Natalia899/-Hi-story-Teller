const express = require("express")
const router = express.Router()

const Event = require("../models/event")

router.get('/events/:start/:end/:country', async (req, res) => {
    //get all data about all history events between ‘start’ and ‘end’ from DB
})
router.post('/event', async (req, res) => {
    // add new event  - need to receive an object with : 
    // eventTitle
    // Images
    // Description
    // Dates
    // Countries
})

router.post('/signUp/:userName/:password', async (req, res) => {
    //add new user
})

router.get('/logIn/:userName/passWord', async (req, res) => {
    // user log in
} )

router.delete('/event/:id', async (req, res) => {
    //delete event from DB
})

router.put('/event/:id', async (req, res) => {
    //change event data
})

router.put('/comment/:eventId', async (req, res) => {
    //add new comment to the event discussion section
})



module.exports = router