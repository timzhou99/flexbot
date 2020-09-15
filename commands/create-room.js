const Room = require('../models/Room');

module.exports = {

    name: 'create-room',
    description: "This will create a study room w/ the specified user limit (0 is default).",
    execute(message, args) {

        let maxParticipants;

        const roomType = ['LC-', 'UC-'];

        if (args[0] === undefined) maxParticipants = 0;
        else maxParticipants = parseInt(args[0]);

        const roomName = '| ' + roomType[Math.floor((Math.random() * 100) + 1)%2] + String(Math.floor((Math.random() * 100) + 1)).padStart(2,'0') + ' | ― Study Room';

        message.guild.channels.create(roomName, { type: 'category' }).then(catChannel => {
            catChannel.setPosition(1);

           message.guild.channels.create('discussion', { type: 'text' }).then(textChannel => {
               textChannel.setParent(catChannel.id);

               message.guild.channels.create('Study Lounge', { type: 'voice', userLimit:maxParticipants }).then(voiceChannel => {
                  voiceChannel.setParent(catChannel.id);

                  const newRoom = new Room({
                     roomName,
                     categoryID: catChannel.id,
                     textID: textChannel.id,
                     voiceID: voiceChannel.id,
                     roomCreator: message.author.id
                  });

                  newRoom.save()
                      .then(event => {

                          textChannel.send(`${message.author} Meeting room has been created. Type !dr in ${textChannel.toString()} to end the session.`);

                      });

               });
           });
        });
    }

}