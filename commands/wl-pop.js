const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-pop',
    description: "This will remove the first user on the waitlist.",
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

                const nextUser = room.waitlistMembers.pop();
                room.save();

                message.reply(`***${message.guild.members.cache.find(member => member.id === nextUser)}***, you are up! Please join the game.`);

            }

        });

    }

}