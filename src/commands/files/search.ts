import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { Message, TextChannel } from "discord.js";
import { joinAndPlay } from "../../services/playService";
import { VideoResult, youtubeSearch } from "../../lib/youtubeSearch";
import { enumerateArray } from "../../utils";
import { waitForNumberReaction } from "../../services/waitForNumberReaction";

export default class implements MyCommand {
  about = 'Search for youtube videos and choose one of them'

  async handleMessage(props: MyCommandProps) {
    const { message } = props
    const video = await this.askUserForVideo(props)
    if (video) {
      await joinAndPlay(message, video.url)
    }
  }

  private async askUserForVideo({ message, args }: MyCommandProps) {
    if (!this.validate(message, args)) {
      return
    }
    const channel = message.channel as TextChannel

    const videos = await youtubeSearch(args.join(' '))
    const videoListMessage = await channel.send(this.formatVideoResults(videos))
    const userResponse = await waitForNumberReaction(videoListMessage, message.author.id)
    const videoIndex = Number(userResponse) - 1

    if (isNaN(videoIndex)) {
      return
    }

    if (!(videoIndex in videos)) {
      await channel.send(`Invalid choice ${userResponse}`)
      return
    }

    return videos[videoIndex]
  }

  private validate(message: Message, args: string[]): boolean {
    if (!message.guildId || !(message.channel instanceof TextChannel)) {
      return false
    }

    if (args.length < 1) {
      message.channel.send('Wrong number of args')
      return false
    }

    return true
  }

  private formatVideoResults = (videos: VideoResult[]) => {
    return `
\`\`\`${enumerateArray(videos.map(i => i.title))}
\`\`\`
    `
  }
}
