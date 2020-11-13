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
                let findUser = message.author.id;

                if (args[1] !== undefined)
                    findUser = args[1].substring(3, args[1].length-1);

                const channel = message.guild.channels.cache.find(channel => channel.id === message.channel.id);

                room.waitlistMembers.forEach((user, pos) => {
                    if (user === findUser) {

                        room.waitlistMembers.splice(pos, 1);
                        room.save();

                        channel.send(`***${message.guild.members.cache.find(member => member.id === findUser)}***, you have been removed from the waitlist.`);

                        exists = true;
                        return;
                    }
                });

                if (exists) return;

                channel.send(`***${message.guild.members.cache.find(member => member.id === findUser)}*** is not a valid user or is not in the waiting list.`);

            }

        });

    }

}