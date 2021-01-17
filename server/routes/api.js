const express = require("express")
const router = express.Router()

const Event = require("../models/event")
const User = require("../models/user")
const data = require('./data')
//console.log(data);

// data.forEach(event=> {
//     let newEvent = new Event({
//         title: event.title,
//         startDate: event.startDate,
//         endDate: event.endDate,
//         countries: event.countries,
//         gallery: event.gallery,
//         description: event.description,
//         approved: true
//     })
//     newEvent.save()
// })

let user1 = new User ({
    username: "Ben",
    password: "1234",
    type: 'admin'
})

let user2 = new User ({
    username: "Rose",
    password: "9874",
    type: 'guest'
})

const usersDB = [user1, user2]
//usersDB.forEach(u=> u.save())

router.get('/events/:start/:end/:country', async (req, res) => {
    const { start, end, country } = req.params
    let events = await Event.find({countries: { $in: [`${country}`] }, startDate: {$gte: `${start}`}, endDate: { $lte: `${end}` }}).exec()
    res.send(events)
})

router.post('/event', async (req, res) => {
    const newEvent = new Event ({... req.body, approved: false})
    newEvent.save()
    res.send(newEvent)
})

router.post('/signUp', async (req, res) => {
    const newUser = new User ({... req.body, type: 'guest'})
    newUser.save()
    res.send(newUser)
})

// router.get('/logIn', async (req, res) => {
//     // user log in
// } )

// router.delete('/event/:id', async (req, res) => {
//     //delete event from DB
// })

// router.put('/event/:id', async (req, res) => {
//     //change event data
// })

// router.put('/comment/:eventId', async (req, res) => {
//     //add new comment to the event discussion section
// })





module.exports = router