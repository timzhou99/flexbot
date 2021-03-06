const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');

const client = new Discord.Client();
const prefix = '!';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('FlexBot is online!');
});

// Connect to MongoDB
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology : true, useFindAndModify: false})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return; //makes sure prefix is at the beginning & bot did not send msg

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    /*

    if (command === 'create-room' || command === 'cr') {
        client.commands.get('create-room').execute(message, args);
    } else if (command === 'delete-room' || command === 'dr') {
        client.commands.get('delete-room').execute(message, args);
    } else if (command === 'lock-room' || command === 'lr') {
        client.commands.get('lock-room').execute(message, args);
    } else if (command === 'invite') {
        client.commands.get('invite').execute(message, args);
    }

     */

    if (command === 'wl-create' || command === 'wlc') {
        client.commands.get('wl-create').execute(message, args);
    } else if (command === 'wl-delete' || command === 'wld') {
        client.commands.get('wl-delete').execute(message, args);
    } else if (command === 'wl-help' || command === 'wlh') {
        client.commands.get('wl-help').execute(message, args);
    } else if (command === 'wl-list' || command === 'wll') {
        client.commands.get('wl-list').execute(message, args);
    } else if (command === 'wl-next' || command === 'wln') {
        client.commands.get('wl-next').execute(message, args);
    } else if (command === 'wl-pop' || command === 'wlp') {
        client.commands.get('wl-pop').execute(message, args);
    } else if (command === 'wl-join' || command === 'wlj') {
        client.commands.get('wl-join').execute(message, args);
    } else if (command === 'wl-remove' || command === 'wlr') {
        client.commands.get('wl-remove').execute(message, args);
    } else if (command === 'wl-wipe' || command === 'wlw') {
        client.commands.get('wl-wipe').execute(message, args);
    } else if (command === 'wl-broadcast' || command === 'wlb') {
        client.commands.get('wl-broadcast').execute(message, args);
    }

});

client.login(process.env.BotToken);

