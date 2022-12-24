import 'module-alias/register'
import { Client, Intents } from 'discord.js'

import config from 'config'
import { CommandManager } from 'CommandManager'
import { onReady, onMessageCreate, onVoiceStateUpdate } from 'clientListeners'

export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    partials: ['CHANNEL'],
})

export const commandManager = new CommandManager(client)

client.on('ready', onReady)
client.on('messageCreate', onMessageCreate)
client.on('voiceStateUpdate', onVoiceStateUpdate)

function close() {
    console.log('Closing.')
    client.destroy()
}
process.on('SIGTERM', close)

client.login(config.token)
