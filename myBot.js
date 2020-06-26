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
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        if(command.usage){
            return message.channel.send(`You didn't provide any arguments, ${message.author}!\nThe proper usage: ${commandPrefix}${command.name} ${command.usage}`);
        }
        else{
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`there was an error trying to execute that command!`);
    }
});

client.login(token);