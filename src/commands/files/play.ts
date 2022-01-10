import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { joinService } from "../../services/joinService";
import { isValidURL } from "../../utils";
import { Message } from "discord.js";
import { playService } from "../../services/playService";

export default class implements MyCommand {
  about = "Plays youtube link";

  async handleMessage({ message, args }: MyCommandProps) {
    if (!this.validate(message, args)) {
      return
    }

    await joinService(message)
    await playService(message, args[0])
  }

  private validate(message: Message, args: string[]): boolean {
    if (!message.guildId || message.channel.type !== 'GUILD_TEXT') {
      return false
    }

    if (args.length < 1) {
      message.channel.send('Wrong number of args')
      return false
    }

    if (!isValidURL(args[0])) {
      message.channel.send('Not a valid URL')
      return false
    }// TODO else get URL from search

    return true
  }
}
