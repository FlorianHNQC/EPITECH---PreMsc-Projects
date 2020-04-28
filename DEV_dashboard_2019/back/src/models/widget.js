const mongoose = require('mongoose')

const widgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    } ,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    } ,
    service: {
        type: String,
        required: true
    } ,
    position: {
        cols: {
            type: Number,
            required: true
        },
        rows: {
            type: Number,
            required: true
        },
        x: {
            type: Number,
            required: true
        }, 
        y: {
            type: Number,
            required: true
        }
    } ,
    params : {
        type: {}
    }
}, {
    timestamps: true
})

const Widget = mongoose.model('Widget', widgetSchema)

module.exports = Widget