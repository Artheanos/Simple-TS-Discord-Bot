import 'module-alias/register'
import { Client, Intents, PresenceData } from 'discord.js'

import censor from './censor'
import config from 'config'
import { CommandManager } from 'CommandManager'
import { getVoiceConnection } from '@discordjs/voice'
import { GuildStorage } from 'lib/guildStorage'

const client = new Client({
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
    if (oldState.member!.id === client.user!.id) return
    if (!oldState.channel) return

    const connection = getVoiceConnection(oldState.guild.id)
    const botVoiceChannelId = connection?.joinConfig.channelId

    const userLeft = oldState.channelId === botVoiceChannelId && newState.channelId !== botVoiceChannelId

    if (userLeft) {
        const botIsAlone = oldState.channel.members.size === 1
        if (botIsAlone) {
            const timeout = setTimeout(() => connection?.disconnect(), 30_000)
            const guildExtension = GuildStorage.getItem(oldState.guild.id)
            guildExtension.aloneTimeout = timeout
        }
    } else {
        const userJoined = oldState.channelId !== botVoiceChannelId && newState.channelId === botVoiceChannelId
        if (userJoined) {
            const guildExtension = GuildStorage.getItem(oldState.guild.id)
            if (guildExtension.aloneTimeout) {
                clearTimeout(guildExtension.aloneTimeout)
                delete guildExtension.aloneTimeout
            }
        }
    }
})

client.login(config.token)
