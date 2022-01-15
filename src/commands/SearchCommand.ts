import { BaseCommand } from "./BaseCommand"
import { joinAndPlay } from "services/playService"
import { youtubeSearch } from "lib/youtubeSearch"
import { waitForNumberReaction } from "services/waitForNumberReaction"
import { enumerateArray } from "utils"
import { Formatters } from "discord.js"

export class SearchCommand extends BaseCommand {
  static description = 'Search for youtube videos and choose one of them'
  static minArgsLength = 1

  async action() {
    const video = await this.getVideoFromUser()
    if (video) {
      await joinAndPlay(this.message, video.url)
    }
  }

  private async getVideoFromUser() {
    const videos = await youtubeSearch(this.args.join(' '))
    const videoListMessage = await this.reply(Formatters.codeBlock(enumerateArray(videos.map(i => i.title))))
    const userResponse = await waitForNumberReaction(videoListMessage, this.message.author.id)
    const videoIndex = Number(userResponse) - 1

    if (isNaN(videoIndex)) {
      return
    }

    if (!(videoIndex in videos)) {
      await this.reply(`Invalid choice ${userResponse}`)
      return
    }

    return videos[videoIndex]
  }
}


