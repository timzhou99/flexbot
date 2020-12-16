const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-join',
    description: "This will add the user to the waitlist.",
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

                let exists = false;

                room.waitlistMembers.forEach((user, pos) => {
                    if (user === message.author.id) {
                        message.reply(`You have already been added to the waitlist. You are currently **${pos+1}** in line.`);
                        exists = true;
                        return;
                    }
                });

                if (exists) return;

                room.waitlistMembers.push(message.author.id);
                room.save();

                message.reply(`You have joined the waitlist. You are currently **${room.waitlistMembers.length}** in line.`);

            }

        });

    }

}