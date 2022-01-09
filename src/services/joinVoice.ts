import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  VoiceConnection,
  VoiceConnectionStatus
} from '@discordjs/voice';
import { Message } from 'discord.js';

export const joinVoice = (message: Message) => {
  return new Promise((resolve: (connection: VoiceConnection) => void, reject) => {
    const { guild } = message

    const connection = joinVoiceChannel({
      channelId: message.member?.voice.channelId!,
      guildId: guild!.id,
      adapterCreator: guild!.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    })

    if (connection.state.status === VoiceConnectionStatus.Ready) {
      return resolve(connection)
    }

    connection.on(VoiceConnectionStatus.Ready, () => {
      resolve(connection)
    })

    setTimeout(() => reject('Joining timeout'), 10_000)
  })
}
