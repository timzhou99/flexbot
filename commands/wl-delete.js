const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-delete',
    description: "This will delete the waitlist.",
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

                room.remove();
                message.reply(`${args[0].toLowerCase()} has been successfully deleted!`);

            }

        })

    }

}