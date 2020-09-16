const Room = require('../models/Room');

module.exports = {

    name: 'lock-room',
    description: "This will lock the room.",
    execute(message, args) {

        Room.findOne({textID: message.channel.id}, (err, room) => {

            if (err || room === null) {
                message.reply(`This room cannot be locked.`);
                return;
            } else if (room.roomCreator !== message.author.id){
                message.reply('Only the room creator has access to lock the room.');
                return;
            } else if (room.roomLocked) {
                message.reply('Room is already locked.');
                return;
            }

            message.guild.roles.create({data: {name: room.roomName, color: "grey"}}).then(role => {

                const member = message.guild.members.cache.find(member => member.id === message.author.id);

                member.roles.add(process.env.roomAccessID);
                member.roles.add(role);

                message.guild.channels.cache.find(channel => channel.id === room.categoryID).updateOverwrite(message.guild.roles.everyone, {
                    VIEW_CHANNEL: false,
                    READ_MESSAGE_HISTORY: false,
                    READ_MESSAGES: false,
                    SEND_MESSAGES: false,
                    CONNECT: false
                });

                message.guild.channels.cache.find(channel => channel.id === room.categoryID).updateOverwrite(role.id, {
                    VIEW_CHANNEL: true,
                    READ_MESSAGE_HISTORY: true,
                    READ_MESSAGES: true,
                    CONNECT: true,
                    SEND_MESSAGES: true,
                    SPEAK: true,
                    MANAGE_MESSAGES: true,
                    EMBED_LINKS: true,
                    ATTACH_FILES: true,
                    USE_EXTERNAL_EMOJIS: true,
                    ADD_REACTIONS: true,
                    MUTE_MEMBERS: true
                });

                Room.findOneAndUpdate({textID: message.channel.id}, { roomRoleID: role.id, roomLocked: true }, (err) => {
                    if (err) throw err;
                });

                const botspam = message.guild.channels.cache.find(channel => channel.id === process.env.botspamID);

                message.reply(`Successfully locked the room. \n To invite others, go to ${botspam.toString()} and type **!invite @User1 @User2 @User3**`);

            });



        });

    }

}