const Discord = require('discord.js');

const config = require('../config/config.json');
const defaultPresence = require('../config/default_presence.json');
const funcs = require('./funcs');
const censor = require('./censor');

const client = new Discord.Client();

client.on('ready', () => {
    client.user.setPresence(defaultPresence).catch(console.error);
    console.log('ready');
});

client.on('message', msg => {

    if (msg.author.id === client.user.id)
        return;

    if (censor(msg))
        return;

    if (msg.content.startsWith(config['prefix'])) {
        let command = msg.content.split(' ')[0].slice(config['prefix'].length);
        if (!config.caseSensitive)
            command = command.toLowerCase();

        if (funcs.hasOwnProperty(command)) {
            funcs[command](msg);
        }
    }
});

client.login(config['token']);