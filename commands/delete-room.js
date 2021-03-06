const Room = require('../models/Room');

module.exports = {

    name: 'delete-room',
    description: "This will delete a study room and all data tied to it.",
    execute(message, args) {


        Room.findOne({textID: message.channel.id}, (err, room) => {

            if (err || room === null) {
                message.reply(`This room cannot be deleted.`);
                return;
            } else if (room.roomCreator !== message.author.id) {
                message.reply('Only the room creator has access to delete the room.');
                return;
            }

            message.guild.channels.cache.find(channel => channel.id === room.textID).delete();

            setTimeout(() => message.guild.channels.cache.find(channel => channel.id === room.voiceID).delete(), 500);
            setTimeout(() => message.guild.channels.cache.find(channel => channel.id === room.categoryID).delete(), 1000);

            if (room.roomLocked) {

                const membersWithRole = message.guild.roles.cache.get(room.roomRoleID).members;

                membersWithRole.forEach(member => {
                    member.roles.remove([message.guild.roles.cache.find(role => role.id === room.roomRoleID), message.guild.roles.cache.find(role => role.id === process.env.roomAccessID)]).catch(console.error);
                });

                message.guild.roles.cache.find(role => role.id === room.roomRoleID).delete();
            }

            room.remove();

            message.author.send('Successfully deleted **' + room.roomName + "**.");

        });

    }

}