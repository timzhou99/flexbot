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

    if (command === 'create-room' || command === 'cr') {
        client.commands.get('create-room').execute(message, args);
    } else if (command === 'delete-room' || command === 'dr') {
        client.commands.get('delete-room').execute(message, args);
    } else if (command === 'lock-room' || command === 'lr') {
        client.commands.get('lock-room').execute(message, args);
    } else if (command ==='invite') {
        client.commands.get('invite').execute(message, args);
    }

});

client.login(process.env.BotToken);

