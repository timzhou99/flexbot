const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-create',
    description: "This will create a waitlist.",
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
            } else if (room !== null) {
                message.reply('A waitlist under this name already exists, please use another name.');
                return;
            } else {

                const guildID = message.guild.id;
                const waitlistTotal = 0;
                const waitlistMembers = [];
                const waitlistName = args[0].toLowerCase();

                const newWaitlist = new Waitlist({
                    guildID,
                    waitlistName,
                    waitlistMembers,
                    waitlistTotal
                });

                newWaitlist.save()
                    .then(event => {
                        message.reply(`Waitlist has been successfully created. Please type !wl-join <${waitlistName}> or !wlg to join the waitlist!`);
                    });

            }

        })

    }

}