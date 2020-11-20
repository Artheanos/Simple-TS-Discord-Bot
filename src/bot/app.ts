import * as discord from 'discord.js';
import {configFile, defaultPresence} from "../config";
import commands from './commands';
import censor from './censor';


const client = new discord.Client();
commands(client);


client.on('ready', () => {
    client.user!.setPresence(defaultPresence as discord.PresenceData).catch(console.error);
    console.log('Ready');
});

client.on('message', msg => {

    if (msg.author.id === client.user!.id)
        return;

    if (censor(msg))
        return;

    commands(msg);
});

client.login(configFile.token);
