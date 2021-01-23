const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    userName:String,
    title: String,
    startDate: Number,
    endDate: Number || null,
    countries: [],
    gallery: [],
    description: String,
    approved: Boolean,
    discussion: [], 
    quiz: []
})

const Event = mongoose.model('event', eventSchema)
module.exports = Event