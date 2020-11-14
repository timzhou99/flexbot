const Waitlist = require('../models/Waitlist');
const Discord = require('discord.js');

module.exports = {

    name: 'wl-help',
    description: "This will show all of the available commands for waitlist.",
    execute(message, args) {

        const channel = message.guild.channels.cache.find(channel => channel.id === message.channel.id);

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Waitlist Commands`)
            .setAuthor('FlexBot - Waitlist', 'https://cdn.freebiesupply.com/logos/thumbs/2x/flex-logo.png')
            .setThumbnail('https://cdn.freebiesupply.com/logos/thumbs/2x/flex-logo.png')
            .setDescription(`<field>'s are required, [field]'s are optional`)

            .addField("```" + `!wl-create <list-name>` + "```" + " or " + "```" + "!wlc" + "```", 'Creates a new waitlist.', false)
            .addField("```" + `!wl-delete <list-name>` + "```" + " or " + "```" + "!wld" + "```", 'Deletes an active waitlist.', false)
            .addField("```" + `!wl-join <list-name>` + "```" + " or " + "```" + "!wlj" + "```", 'Adds the user to the specified waitlist.', false)
            .addField("```" + `!wl-pop <list-name>` + "```" + " or " + "```" + "!wlp" + "```", 'Removes the first person off the specified waitlist.', false)
            .addField("```" + `!wl-remove <list-name> [@user]` + "```" + " or " + "```" + "!wlr" + "```", 'Removes the current/targeted user from the specified waitlist.', false)
            .addField("```" + `!wl-wipe <list-name>` + "```" + " or " + "```" + "!wlw" + "```", 'Clears the specified waitlist.', false)
            .addField("```" + `!wl-next <list-name>` + "```" + " or " + "```" + "!wln" + "```", 'Find out who the next person is on the specified waitlist.', false)
            .addField("```" + `!wl-list <list-name>` + "```" + " or " + "```" + "!wll" + "```", 'See a list of who is currently on the specified waitlist.', false)
            .addField("```" + `!wl-broadcast <list-name> <message>` + "```" + " or " + "```" + "!wlb" + "```", 'Broadcast a message to all of the users currently on the waitlist.', false)

            .setTimestamp()
            .setFooter('FlexBot Created by iReflex99', 'https://cdn.freebiesupply.com/logos/thumbs/2x/flex-logo.png');

        channel.send(exampleEmbed);

    }

}