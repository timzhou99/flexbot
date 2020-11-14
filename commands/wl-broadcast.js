const Waitlist = require('../models/Waitlist');
const Discord = require('discord.js');

module.exports = {

    name: 'wl-broadcast',
    description: "This will broadcast a message to all of the users currently on the waitlist.",
    execute(message, args) {

        if (args[0] === undefined) {
            message.reply('No waitlist specified in command.');
            return;
        }

        else if (args[1] === undefined) {
            message.reply(`Please enter a message!`);
            return;
        }

        Waitlist.findOne({ $and:[{waitlistName: args[0].toLowerCase()}, {guildID: message.guild.id}] }, (err, room) => {

            if (err) {
                console.error();
                return;
            } else if (room == null) {
                message.reply('A waitlist under this name does not exist.');
                return;
            } else {

                if (room.waitlistMembers.length === 0) {
                    message.reply(`This waitlist is currently empty.`);
                    return;
                }

                const channel = message.guild.channels.cache.find(channel => channel.id === message.channel.id);

                let returnList = '';

                room.waitlistMembers.forEach((user, pos) => {

                    if (user === undefined) {
                        returnList = 'Something went wrong. Please reach out to Tim.';
                        return;
                    }

                    returnList += `${message.guild.members.cache.find(member => member.id === user)}`;
                    returnList += " ";
                });

                let messageContent = '';

                for (let i = 1; i < args.length; i++) {
                    messageContent += args[i] + ' ';
                }

                channel.send(`${returnList} ${messageContent}`);

            }

        });


    }

}