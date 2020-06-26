const { MessageAttachment } = require('discord.js');

module.exports = {
    name: '1up',
    description: 'Give a server homie som Mario flavored Kudos!',
    execute(message, args){
        const receivingUser = message.mentions.users.first();
        const sendDM = (args[1]) ? args[1].toLowerCase(): null;
        let botPost = `${message.author} gave ${receivingUser} a 1up!\n`;
        const attachment = new MessageAttachment('http://wallpoper.com/images/00/05/07/09/1up-mushroom-ii_00050709.jpg');

        if(sendDM === 'DM'){
            receivingUser.send(botPost, attachment);
        }
        message.channel.send(botPost, attachment);
    }
};