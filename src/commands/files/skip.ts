import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { GuildStorage } from "../../lib/guildStorage";

export default class implements MyCommand {
  about = 'Skip current track'
  alias = ['next', 's']

  handleMessage({ message }: MyCommandProps) {
    if (!message.guildId) {
      return
    }
    GuildStorage.getItem(message.guildId).playerWrapper.getPlayer()?.stop()
  }
}
