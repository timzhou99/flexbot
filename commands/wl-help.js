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

            .addField("```" + `!wl-create <list-name>` + "```" + " or " + "```" + "!wlc" + "```", 'Creates a new waitlist.', false)
            .addField("```" + `!wl-delete <list-name>` + "```" + " or " + "```" + "!wld" + "```", 'Deletes an active waitlist.', false)
            .addField("```" + `!wl-join <list-name>` + "```" + " or " + "```" + "!wlj" + "```", 'Adds the user to the waitlist.', false)
            .addField("```" + `!wl-pop <list-name>` + "```" + " or " + "```" + "!wlp" + "```", 'Removes the first person off the waitlist.', false)
            .addField("```" + `!wl-remove <list-name>` + "```" + " or " + "```" + "!wlr" + "```", 'Removes yourself from the waitlist.', false)
            .addField("```" + `!wl-next <list-name>` + "```" + " or " + "```" + "!wln" + "```", 'Find out who the next person is on the waitlist.', false)
            .addField("```" + `!wl-list <list-name>` + "```" + " or " + "```" + "!wll" + "```", 'See who is on the current waitlist.', false)

            .setTimestamp()
            .setFooter('FlexBot Created by iReflex99', 'https://cdn.freebiesupply.com/logos/thumbs/2x/flex-logo.png');

        channel.send(exampleEmbed);

    }

}