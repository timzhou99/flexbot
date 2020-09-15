const Room = require('../models/Room');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


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

            setTimeout(() => message.guild.channels.cache.find(channel => channel.id === room.voiceID).delete(), 250);
            setTimeout(() => message.guild.channels.cache.find(channel => channel.id === room.categoryID).delete(), 250);

            message.author.send('Successfully deleted **' + room.roomName + "**.");

        });

    }

}