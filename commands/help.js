const {commandPrefix} = require('../botConfig.json');

module.exports = {
    name: 'help',
    description: 'List all commands or info on a command',
    usage: 'optional <command name>',
    execute(message, args){
        const data = [];
        const {commands} = message.client;

        if(!args.length){
            data.push("You don't know what the hell is going on - *do you*?");
            data.push(commands.map(cmd => cmd.name).join(', '));
            data.push(`\nYou can send \`${commandPrefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        
    }
};