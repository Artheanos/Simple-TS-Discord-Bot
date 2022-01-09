import 'module-alias/register'
import * as Discord from 'discord.js';
import config from "config";
import commands from './commands';
import censor from './censor';


const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ]
})
commands(client);


client.on('ready', () => {
  client.user!.setPresence(config.defaultPresence as Discord.PresenceData)
  console.log('Ready');
});

client.on('messageCreate', msg => {

  if (msg.author.id === client.user!.id)
    return;

  if (censor(msg))
    return;

  commands(msg);
});

client.login(config.token);
