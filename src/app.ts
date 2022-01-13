import 'module-alias/register'
import { Intents, PresenceData, Client } from 'discord.js'
import config from "config"
import { CommandManager } from './CommandManager'
import censor from './censor'


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
  ]
})
const commandManager = new CommandManager(client)

client.on('ready', () => {
  client.user!.setPresence(config.defaultPresence as PresenceData)
  console.log('Ready')
})

client.on('messageCreate', msg => {
  if (msg.author.id === client.user!.id)
    return

  if (censor(msg))
    return

  commandManager.onCreateMessage(msg)
})

client.on('voiceStateUpdate', (oldState, newState) => {

})

client.login(config.token)
