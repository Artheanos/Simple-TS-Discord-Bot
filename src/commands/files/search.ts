import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { Message, TextChannel } from "discord.js";
import { joinAndPlay } from "../../services/playService";
import { VideoResult, youtubeSearch } from "../../lib/youtubeSearch";
import { enumerateArray } from "../../utils";

const cancelSearchMessage = 'q'

const getResponse = async (authorId: string, channel: TextChannel) => {
  const awaitedMessage = await channel.awaitMessages({
    filter: (msg) => {
      return msg.author.id === authorId
    },
    max: 1,
    time: 30_000,
    errors: ['time']
  })

  return awaitedMessage.first()
}

export default class implements MyCommand {
  about = 'Search for youtube videos and play one of them'
  alias = ['s']

  async handleMessage({ message, args }: MyCommandProps) {
    if (!this.validate(message, args)) {
      return
    }
    const channel = message.channel as TextChannel

    const videos = await youtubeSearch(args[0])
    await channel.send(this.formatVideoResults(videos))
    const userResponse = await getResponse(message.author.id, channel)
    if (!userResponse?.content) {
      return
    }
    if (userResponse.content === cancelSearchMessage) {
      userResponse.react('👍')
      return
    }
    const videoIndex = Number(userResponse.content) - 1

    if (!isNaN(videoIndex) && videoIndex in videos) {
      await joinAndPlay(message, videos[videoIndex].url)
    } else {
      await channel.send(`Invalid choice ${userResponse}`)
    }
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

${cancelSearchMessage} - Cancel search\`\`\`
    `
  }

  private validateNumberResponse = () => {

  }
}
