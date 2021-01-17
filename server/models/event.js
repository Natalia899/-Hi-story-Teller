const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: String,
    startDate: Number,
    endDate: Number || null,
    countries: [],
    gallery: [],
    description: String,
    approved: Boolean
})

const Event = mongoose.model('event', eventSchema)
module.exports = Event