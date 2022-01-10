import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  VoiceConnection,
  VoiceConnectionStatus
} from '@discordjs/voice';
import { Message } from 'discord.js';
import { FriendlyError } from "../FriendlyError";

const joinVoice = (message: Message) => {

  return new Promise((resolve: (connection: VoiceConnection) => void, reject) => {
    const { guild } = message
    const voiceChannelId = message.member?.voice.channelId

    if (!voiceChannelId) {
      return reject(new FriendlyError('User not in a voice channel'))
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannelId,
      guildId: guild!.id,
      adapterCreator: guild!.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    })

    if (connection.state.status === VoiceConnectionStatus.Ready) {
      return resolve(connection)
    }

    connection.on(VoiceConnectionStatus.Ready, () => {
      resolve(connection)
    })

    setTimeout(() => reject(new FriendlyError('Joining timeout')), 10_000)
  })
}

export const joinService = async (message: Message) => {
  await joinVoice(message)
}
