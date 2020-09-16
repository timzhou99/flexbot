const Room = require('../models/Room');

module.exports = {

    name: 'create-room',
    description: "This will create a study room w/ the specified user limit (0 is default).",
    execute(message, args) {

        Room.findOne({ roomCreator: message.author.id }, (err, room) => {

            if (err) {
                console.error();
                return;
            } else if (room !== null) {
                message.reply('You have created a room already, please close it before creating a new one.');
                return;
            } else {

                let maxParticipants;

                const roomType = ['LC-', 'UC-'];

                if (args[0] === undefined) maxParticipants = 0;
                else maxParticipants = parseInt(args[0]);

                if (maxParticipants > 99) maxParticipants = 0;
                else if (maxParticipants < 0) maxParticipants = 0;

                const roomName = roomType[Math.floor((Math.random() * 100) + 1)%2] + String(Math.floor((Math.random() * 100) + 1)).padStart(2,'0');

                message.guild.channels.create('| ' + roomName + ' | ― Study Room', { type: 'category' }).then(catChannel => {
                    catChannel.setPosition(message.guild.channels.cache.find(channel => channel.id === process.env.RoomStart).position + 1);

                    setTimeout(() => message.guild.channels.create('discussion', { type: 'text' }).then(textChannel => {
                        textChannel.setParent(catChannel.id);

                        setTimeout(() => message.guild.channels.create('Study Lounge', { type: 'voice', userLimit:maxParticipants }).then(voiceChannel => {
                            voiceChannel.setParent(catChannel.id);

                            const newRoom = new Room({
                                roomName,
                                roomLimit: maxParticipants,
                                categoryID: catChannel.id,
                                textID: textChannel.id,
                                voiceID: voiceChannel.id,
                                roomCreator: message.author.id
                            });

                            newRoom.save()
                                .then(event => {

                                    textChannel.send(`${message.author} Meeting room has been created. Type **!dr** in ${textChannel.toString()} to end the session.`);
                                    textChannel.send('To make this room private type **!lock-room** or **!lr**');

                                });

                        }), 500);
                    }), 500);
                });

            }
        });
    }

}