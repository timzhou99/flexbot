const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({

    roomName: {type: String, required: true},
    roomLimit: {type: Number, required: true},

    categoryID: {type: String, required: true},
    textID: {type: String, required: true},
    voiceID: {type: String, required: true},

    roomCreator: {type: String, required: true},

    roomRoleID: {type: String, required: false},

    roomLocked: {type: Boolean, default: false, required: true}

}, {
    _id: true
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
