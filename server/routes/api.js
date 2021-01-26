const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");
const data = require("./data");
const cors = require("cors");

const bcrypt = require('bcrypt')

// data.forEach((event) => {
// 	let newEvent = new Event({
// 		userName: event.userName,
// 		title: event.title,
// 		startDate: event.startDate,
// 		endDate: event.endDate,
// 		countries: event.countries,
// 		gallery: event.gallery,
// 		description: event.description,
// 		approved: true,
//          quiz: event.quiz
// 	});
// 	newEvent.save();
// });

let user1 = new User({
	username: "Ben",
	password: "1234",
	type: "admin",
});

let user2 = new User({
	username: "Rose",
	password: "9874",
	type: "guest",
});

const usersDB = [user1, user2];
// usersDB.forEach(u=> u.save())

router.post('/events', async (req, res) => {
    const { countries, startDate, endDate} = req.body
    const events = []
    for(let country of countries){
        await Event.find({ 
            approved: true,
            countries: { $in: [`${country}`] },
            startDate: { $gte: `${startDate}` },
            endDate: { $lte: `${endDate}` } })
            .then(response => {
                events.push(response)
            })
    }
    res.send(events)
})

router.get('/quiz', async (req, res)=> {
    const allEvents = await Event.find({})
    let result = allEvents.map(event => { return {id: event._id, title: event.title, quiz: event.quiz}})
    res.send(result)
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



// router.post('/login', async (req, res) => {
//     const { username, password } = req.body
//     let relUser = await User.findOne({ username, password})
//     res.send(relUser)
// })

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    let relUser = await User.findOne({ username })
    console.log(relUser)
    bcrypt.compare(password, relUser.password, (err, result) => {
        if (result) {
            res.send(relUser)
        } else {
            res.send('Password is incorrect')
        }
    })
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
    Event.find({ _id: id }, (err, event) => {
        event[0].discussion.push(newComment)
        event[0].save()
        res.send(event)
    })
})

router.get('/suggestions', async (req, res) => {
    let suggestions = await Event.find({approved: false}).exec()
    res.send(suggestions)
})


module.exports = router;
