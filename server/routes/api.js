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

let user1 = new User({
    username: "Ben",
    password: "1234",
    type: 'admin'
})

let user2 = new User({
    username: "Rose",
    password: "9874",
    type: 'guest'
})

const usersDB = [user1, user2]
// usersDB.forEach(u=> u.save())

router.get('/events/:start/:end/:country', async (req, res) => {
    const { start, end, country } = req.params
    let events = await Event.find({ countries: { $in: [`${country}`] }, startDate: { $gte: `${start}` }, endDate: { $lte: `${end}` } }).exec()
    res.send(events)
})

router.post('/event', async (req, res) => {
    const newEvent = new Event({ ...req.body, approved: false })
    newEvent.save()
    res.send(newEvent)
})

router.post('/signUp', async (req, res) => {
    const newUser = new User({ ...req.body, type: 'guest' })
    newUser.save()
    res.send(newUser)
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    let relUser = await User.findOne({ username, password})
    res.send(relUser)
})

router.delete('/event/:id', async (req, res) => {
    const { id } = req.params
    let relEvent = await Event.findOneAndDelete({ _id: id })
    res.send(relEvent)
})

router.put('/event/:id', async (req, res) => {
    const { id } = req.params
    await Event.findOneAndDelete({ _id: id })
    const newEvent = new Event({ ...req.body, approved: true })
    newEvent.save()
    res.send(newEvent)
})

router.put('/comment/:id', async (req, res) => {
    const { id } = req.params
    let newComment = req.body
    console.log(req.body);
    Event.find({ _id: id }, (err, event) => {
        console.log(event);
        event[0].discussion.push(newComment)
        console.log(event);
        event[0].save()
        res.send(event)
    })
    // let relEvent = await Event.find({_id: id})
    // relEvent[0].discussion.push(...req.body)
    // await relEvent[0].save()
    // res.send(relEvent[0].discussion)
})


module.exports = router