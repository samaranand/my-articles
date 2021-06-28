const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    markdown:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true
    }
})

// if i delete any article, that will ve saved in bin-articles collection

module.exports = mongoose.model('bin-articles', articleSchema);