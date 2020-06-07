const Discord = require('discord.js');

const config = require('../config/config.json');
const defaultPresence = require('../config/default_presence.json');
const Commands = require('./commands');
const censor = require('./censor');

const client = new Discord.Client();
const commands = Commands(client);

client.on('ready', () => {
    client.user.setPresence(defaultPresence).catch(console.error);
    console.log('ready');
});

client.on('message', msg => {

    if (msg.author.id === client.user.id)
        return;

    if (censor(msg))
        return;

    commands(msg);
});

client.login(config['token']);