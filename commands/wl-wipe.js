const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-wipe',
    description: "This will clear the waitlist.",
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

                room.waitlistMembers = [];
                room.save();

                message.reply(`The ${room.waitlistName} waitlist has been wiped.`);

            }

        });

    }

}