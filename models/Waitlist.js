const mongoose = require('mongoose');

const WaitlistSchema = new mongoose.Schema({

    waitlistName: {type: String, required: true},
    waitlistMembers: [{type: String, required: false}],

    waitlistTotal: {type: Number, required: true, default: 0},

}, {
    _id: true
});

const Waitlist = mongoose.model('Waitlist', WaitlistSchema);
module.exports = Waitlist;
