import { Message } from "discord.js"

import { GuildStorage } from "lib/guildStorage"
import { downloadTrack, filePathToTitle } from "lib/youtubeDownloader"
import { isValidURL } from "utils"
import { youtubeSearch } from "lib/youtubeSearch"
import { JoinService } from "./JoinService"

export class PlayService {
  constructor(private message: Message, private track: string) { }

  async call() {
    try {
      await new JoinService(this.message).call()
      const responseMessage = await this.message.channel.send('Downloading')
      const filePath = await downloadTrack(await this.videoUrl())
      const trackTitle = filePathToTitle(filePath)
      const scheduler = GuildStorage.getItem(this.message.guildId!).scheduler

      await scheduler.enqueue(filePath)

      if (scheduler.currentTrack) {
        await responseMessage.edit(`Enqueued \`${trackTitle}\``)
      } else {
        await responseMessage.edit(`Now playing \`${trackTitle}\``)
      }

    } catch (e: any) {
      this.message.channel.send(e.toString())
    }
  }

  private async videoUrl(): Promise<string> {
    return isValidURL(this.track) ? this.track : this.getFirstResultFromYoutube()
  }

  private async getFirstResultFromYoutube() {
    return (await youtubeSearch(this.track))[0].url
  }
}
