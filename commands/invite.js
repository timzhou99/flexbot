const Room = require('../models/Room');

module.exports = {

    name: 'invite',
    description: "This will allow others to join the room.",
    execute(message, args) {

        Room.findOne({roomCreator: message.author.id}, (err, room) => {

            if (err || room === null) {
                message.reply(`You do not have a room. Type **!cr** to create a room.`);
                return;
            }

            args.forEach(toInvite => {

                const member = message.guild.members.cache.find(member => member.id === toInvite.substring(3, toInvite.length-1));

                if (member !== undefined) {
                    if (room.roomLocked) {
                        const role = message.guild.roles.cache.find(role => role.id === room.roomRoleID);
                        member.roles.add(process.env.roomAccessID);
                        member.roles.add(role);
                    }

                    const channelInvite = message.guild.channels.cache.find(channel => channel.id === room.textID).createInvite({
                        maxAge: 86400,
                        maxUses: 1,
                        unique: true
                    }).then((invite) => {
                        member.send(`${message.author} has invited you to join a room. Join here: ${invite}`);
                    });
                }

            });

            message.reply(`Successfully sent out invitations for ${room.roomName}!`);
        });

    }

}