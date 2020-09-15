const Room = require('../models/Room');

module.exports = {

    name: 'delete-room',
    description: "This will delete a study room and all data tied to it.",
    execute(message, args) {

        Room.findOneAndDelete({textID: message.channel.id}, (err, room) => {

            if (err || room === null) {
                message.reply(`This room cannot be deleted.`);
                return;
            }

            message.guild.channels.cache.find(channel => channel.id === room.textID).delete();
            message.guild.channels.cache.find(channel => channel.id === room.voiceID).delete();
            message.guild.channels.cache.find(channel => channel.id === room.categoryID).delete();

            message.author.send('Successfully deleted **' + room.roomName + "**.");

        });

    }

}