import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { joinVoice } from "../../services/joinVoice";
import { isValidURL } from "../../utils";
import { GuildStorage } from "../../lib/guildStorage";
import { createAudioResource } from "@discordjs/voice";
import { downloadSong } from "../../lib/youtubeDownloader";

export default class implements MyCommand {
  about = "Plays youtube link";

  async handleMessage({ message, args }: MyCommandProps) {
    const { channel: { send } } = message

    if (!message.guildId || message.channel.type !== 'GUILD_TEXT') {
      return
    }

    if (args.length < 1) {
      return send('Wrong number of args')
    }

    if (!isValidURL(args[0])) {
      return send('Not a valid URL')
    }// TODO else get URL from search

    await joinVoice(message)
    try {
      await GuildStorage.getGuildExtension(message.guildId).queue.add(args[0])
      message.channel.send('Enqueued')
    } catch (e: any) {
      message.channel.send(e.toString())
    }
  }
}
