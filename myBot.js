const fs = require('fs');
const Discord = require('discord.js');
const {commandPrefix} = require('./botConfig.json');
const {token} = require('./secret.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

//this dynamically creates the available commands from whatever is in ./commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//ready is discord.js event, the code here will run on bot readiness
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });
//message is another discord.js event, this code runs whenever a message comes through where maximus is logged in
 client.on('message', message => {
    console.log(message.author.username + ': ' + message.content);
    //if it doesn't have the comand prefix, don't do anything
    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(commandPrefix.length).split(/ +/);//split on any whitespace with regex
    const commandName = args.shift().toLowerCase();//instantiate the command name and remove it from args

    if (!client.commands.has(commandName)) return;//if the command doesn't exist here, don't do anything

    const command = client.commands.get(commandName);

    //if command file has args: true, check for args
    if (command.args && !args.length) {
        if(command.usage){
            return message.channel.send(`You didn't provide any arguments, ${message.author}!\nThe proper usage: ${commandPrefix}${command.name} ${command.usage}`);
        }
        else{
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        
    }

    try {
        command.execute(message, args);//try to do the thing the user cmd
    } catch (error) {
        console.error(error);
        message.reply(`there was an error trying to execute that command!`);
    }
});

client.login(token);