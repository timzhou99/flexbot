const Waitlist = require('../models/Waitlist');
const Discord = require('discord.js');

module.exports = {

    name: 'wl-list',
    description: "This will list all of the users currently on the waitlist.",
    execute(message, args) {

        if (args[0] === undefined) {
            message.reply('No waitlist specified in command.');
            return;
        }

        else if (args[1] !== undefined) {
            message.reply(`Please enter a waitlist name that does not include spaces, include hyphens if used.`);
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

                    let userName = '';

                    message.guild.members.cache.find(member => member.id === user).then((me) => {
                        userName = me.displayName;
                    })

                    returnList += `**${pos+1} - ** ${userName} \n`;
                });

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Current Waitlist for __${room.waitlistName}__`)

                    .setDescription(`${returnList}`)

                    .setTimestamp()

                channel.send(exampleEmbed);

            }

        });


    }

}