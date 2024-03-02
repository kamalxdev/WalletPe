
const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance:{
        type: Number,
        required: true
    },
})


module.exports = mongoose.model('ACCOUNT', accountSchema);