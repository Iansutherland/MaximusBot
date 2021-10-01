const MaximusRepo = require('../db/MaximusRepo');

module.exports = {
    name: 'remember',
    description: 'Have Maximus remember something for you. Because technology has spoiled your mind. You goldfish.',
    args: true,
    useage: '<Thing to remember>',
    execute(message, args){
        const botPost = `I'll remember this for you ${message.author}`;
        const stuffToRemember = args[0];
        const dateSaved = new Date.now();
        //use repo to store stuff
        const result = MaximusRepo.Remember.store(
            {
                remember: stuffToRemember,
                user: message.author.id,
                date: dateSaved
            });
        //if it failes tell the user
        return result;
    }
}