const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-remove',
    description: "This will remove a user from the waitlist.",
    execute(message, args) {

        if (args[0] === undefined) {
            message.reply('No waitlist specified in command.');
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

                        room.waitlistMembers.splice(pos, 1);
                        room.save();
                        message.reply(`You have been removed from the waitlist.`);
                        exists = true;
                        return;
                    }
                });

                if (exists) return;

                message.reply(`You are currently not on the waiting list.`);

            }

        });

    }

}