module.exports = {
    name: 'server',
    description: 'Get server deets',
    execute(message, args) {
        message.channel.send(`This server's name is: ${message.guild.name}\n` + 
        `Created: ${message.guild.createdAt} \n` +
        `In Region: ${message.guild.region}`);
    }
};