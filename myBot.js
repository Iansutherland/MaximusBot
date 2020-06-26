const Discord = require('discord.js');
const {commandPrefix} = require('./botConfig.json');
const {token} = require('./secret.json');
const client = new Discord.Client();

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

 const availableCommands = [
     {command: `${commandPrefix}help`, description: "See this help prompt"},
     {command: `${commandPrefix}ping`, description: "See if Maximus (the bot) is around"},
     {command: `${commandPrefix}server`, description: "Get server deets"},
     {command: `${commandPrefix}whoami`, description: "You lack sleep and forgot who you are, let Maximus remind you"}
];

 client.on('message', message => {
    console.log(message.author.username + ': ' + message.content);

    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(commandPrefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === `ping`) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
    else if (command === `server`) {
        message.channel.send(`This server's name is: ${message.guild.name}\n` + 
        `Created: ${message.guild.createdAt}\n` +
        `In Region: ${message.guild.region}`);
    }
    else if (command === `whoami`) {
        message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
    else if(command === `help`){
        let helpList = `available commands:\n`
        for(let i=0; i<availableCommands.length; i++){
            const {command, description} = availableCommands[i];
            helpList += (`${command}, ${description}\n`);
        }
        message.reply(helpList);
    }
    else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
    
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    }
    
});
client.login(token);