import { getVoiceConnection, VoiceConnection } from '@discordjs/voice'

import { client } from 'app'
import { GuildStorage } from 'lib/guildStorage'
import { ClientEventListener } from 'clientListeners/types'

const LEAVE_AFTER = 30_000

const onVoiceStateUpdate: ClientEventListener<'voiceStateUpdate'> = (oldState, newState) => {
    if (oldState.member!.id === client.user!.id) return
    if (!oldState.channel) return

    const connection: VoiceConnection | undefined = getVoiceConnection(oldState.guild.id)
    const botVoiceChannelId: string | null | undefined = connection?.joinConfig.channelId

    const userLeft: boolean = oldState.channelId === botVoiceChannelId && newState.channelId !== botVoiceChannelId

    if (userLeft) {
        const botIsAlone = oldState.channel.members.size === 1
        if (botIsAlone) {
            GuildStorage.getGuildExtension(oldState.guild.id).aloneTimeout = setTimeout(
                () => connection?.disconnect(),
                LEAVE_AFTER,
            )
        }
    } else {
        const userJoined = oldState.channelId !== botVoiceChannelId && newState.channelId === botVoiceChannelId
        if (userJoined) {
            const guildExtension = GuildStorage.getGuildExtension(oldState.guild.id)
            if (guildExtension.aloneTimeout) {
                clearTimeout(guildExtension.aloneTimeout)
                delete guildExtension.aloneTimeout
            }
        }
    }
}

export default onVoiceStateUpdate
