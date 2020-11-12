const Waitlist = require('../models/Waitlist');

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

        Waitlist.findOne({ waitlistName: args[0].toLowerCase() }, (err, room) => {

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

                let returnList = `**${room.waitlistName}** current waitlist: \n`;

                room.waitlistMembers.forEach((user, pos) => {

                    returnList += `**[${pos+1}.]** ***${message.guild.members.cache.find(member => member.id === user).displayName}*** \n`;

                });

                message.reply(`${returnList}`);

            }

        });


    }

}