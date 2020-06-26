module.exports = {
    name: "ping",
    description: "See if Maximus (the bot) is around",
    execute(message, args) {
        // send back "Pong." to the channel the message was sent in
        message.reply('Pong.');
    }
}