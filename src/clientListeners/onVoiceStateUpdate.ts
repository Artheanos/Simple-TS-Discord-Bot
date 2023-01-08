import { getVoiceConnection, VoiceConnection } from '@discordjs/voice'

import { client } from 'app'
import { GuildExtensionsManager } from 'lib/guildStorage'
import { ClientEventListener } from 'clientListeners/types'

const LEAVE_AFTER = 30_000

const onVoiceStateUpdate: ClientEventListener<'voiceStateUpdate'> = (oldState, newState) => {
    if (oldState.member!.id === client.user!.id) return
    if (!oldState.channel) return

    const connection: VoiceConnection | undefined = getVoiceConnection(oldState.guild.id)
    const botVoiceChannelId: string | null | undefined = connection?.joinConfig.channelId

    const userLeft: boolean = oldState.channelId === botVoiceChannelId && newState.channelId !== botVoiceChannelId
    const userJoined: boolean = oldState.channelId !== botVoiceChannelId && newState.channelId === botVoiceChannelId

    if (userLeft) {
        const botIsAlone = oldState.channel.members.size === 1
        if (botIsAlone) {
            GuildExtensionsManager.getGuildExtension(oldState.guild.id).setAloneTimeout(
                () => connection?.disconnect(),
                LEAVE_AFTER,
            )
        }
    } else if (userJoined) {
        GuildExtensionsManager.getGuildExtension(oldState.guild.id).removeAloneTimeout()
    }
}

export default onVoiceStateUpdate
