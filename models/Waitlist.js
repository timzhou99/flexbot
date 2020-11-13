const mongoose = require('mongoose');

const WaitlistSchema = new mongoose.Schema({

    guildID: {type: String, required: true},

    waitlistName: {type: String, required: true},
    waitlistMembers: [{type: String, required: false}],

}, {
    _id: true
});

const Waitlist = mongoose.model('Waitlist', WaitlistSchema);
module.exports = Waitlist;
