const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: String,
    images: [],
    description: String,
    approved: Boolean
})

const Event = mongoose.model('event', eventSchema)
module.exports = Event