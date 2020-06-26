const fs = require('fs');
const Discord = require('discord.js');
const {commandPrefix} = require('./botConfig.json');
const {token} = require('./secret.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

 client.on('message', message => {
    console.log(message.author.username + ': ' + message.content);

    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(commandPrefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === `ping`) {
        client.commands.get('ping').execute(message, args);
    }
    else if (command === `server`) {
        client.commands.get('server').execute(message, args);
    }
    else if (command === `whoami`) {
        client.commands.get('whoami').execute(message, args);
    }
    else if (command === 'avatar') {
        client.commands.get('avatar').execute(message, args);
    }
    
});
client.login(token);