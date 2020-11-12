const Waitlist = require('../models/Waitlist');

module.exports = {

    name: 'wl-help',
    description: "This will show all of the available commands for waitlist.",
    execute(message, args) {

        message.reply(`Here are the available commands for the waitlist feature! 
        
        [1.] **!wl-create {listName}** to create a new waitlist. 
        [2.] **!wl-delete {listName}** to delete an active waitlist. \n 
        [3.] **!wl-join {listName}** to join a waitlist. 
        [4.] **!wl-pop {listName}** to remove the first person off the waitlist. 
        [5.] **!wl-next {listName}** to see who the next person is on the waitlist. 
        [6.] **!wl-list {listName}** to see the current waitlist. 
        
        `);

    }

}