import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { Message } from "discord.js";
import { joinAndPlay } from "../../services/playService";

export default class implements MyCommand {
  about = 'Plays the first youtube search result or a youtube video if given an url'
  alias = ['p']

  async handleMessage({ message, args }: MyCommandProps) {
    if (!this.validate(message, args)) {
      return
    }

    await joinAndPlay(message, args.join(' '))
  }

  private validate(message: Message, args: string[]): boolean {
    if (!message.guildId || message.channel.type !== 'GUILD_TEXT') {
      return false
    }

    if (args.length < 1) {
      message.channel.send('Wrong number of args')
      return false
    }

    return true
  }
}
