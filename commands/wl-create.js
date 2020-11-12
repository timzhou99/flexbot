const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-create',
    description: "This will create a waitlist.",
    execute(message, args) {

        console.log(args);
        console.log(args[1]);

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
            } else if (room !== null) {
                message.reply('A waitlist under this name already exists, please use another name.');
                return;
            } else {

                const waitlistTotal = 0;
                const waitlistMembers = [];
                const waitlistName = args[0].toLowerCase();

                const newWaitlist = new Waitlist({
                   waitlistName,
                   waitlistMembers,
                   waitlistTotal
                });

                newWaitlist.save()
                    .then(event => {
                        message.reply(`Waitlist has been successfully created. Please type **!wl-join ${waitlistName}** to join the waitlist!`);
                    });

            }

        })

    }

}