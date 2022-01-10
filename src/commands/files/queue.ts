import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { GuildStorage } from "../../lib/guildStorage";
import * as path from "path";
import { enumerateArray } from "../../utils";

export default class implements MyCommand {
  about = 'Shows the currently queued songs'

  handleMessage({ message }: MyCommandProps) {
    const songs = GuildStorage.getItem(message.guildId!).scheduler.songs
    if (songs.length) {
      message.channel.send(enumerateArray(songs.map(this.filePathToTitle)))
    } else {
      message.channel.send('Empty queue')
    }
  }

  private filePathToTitle = (filePath: string): string => {
    const fileName = path.basename(filePath, '.opus')
    const matcher = fileName.match(/(.{11})_(.*)/)
    if (matcher) {
      const [, , title] = matcher
      return title
    }
    return ''
  }
}
