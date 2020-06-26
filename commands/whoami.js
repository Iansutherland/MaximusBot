module.exports = {
    name: "whoami",
    description: "You lack sleep and forgot who you are, let Maximus remind you",
    execute(message, args){
        message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
};