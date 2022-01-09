import {
  AudioPlayer,
  createAudioPlayer, createAudioResource,
  getVoiceConnection,
  NoSubscriberBehavior
} from "@discordjs/voice";

import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { joinVoice } from "../../services/joinVoice";
import { isValidURL } from "../../utils";
import { downloadSong } from "../../lib/youtubeDownloader";

const guildPlayers: Record<string, AudioPlayer> = {}

const findOrCreatePlayer = (guildId: string): AudioPlayer => {
  const connection = getVoiceConnection(guildId)

  if (!connection) {
    throw 'Connection not found'
  }

  connection.on('stateChange', (oldState, newState) => {
    if (newState.status === 'disconnected' || newState.status === 'destroyed') {
      delete guildPlayers[guildId]
    }
  })

  if (!guildPlayers[guildId]) {
    const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause, }, });
    connection?.subscribe(player)
    guildPlayers[guildId] = player
  }

  return guildPlayers[guildId]
}


export default class implements MyCommand {
  about = "Plays youtube link";

  async handleMessage({ message, args }: MyCommandProps) {
    // const { channel: { send } } = message

    if (!message.guildId) {
      return
    }

    if (args.length < 1) {
      return message.channel.send('Wrong number of args')
    }

    if (!isValidURL(args[0])) {
      return message.channel.send('Not a valid URL')
    }// TODO else get URL from search

    await joinVoice(message)
    const player = findOrCreatePlayer(message.guildId)

    message.channel.send('Downloading')
    downloadSong(args[0]).then((outputPath) => {
      message.channel.send('Playing')
      player.play(createAudioResource(outputPath))
    })
  }
}
