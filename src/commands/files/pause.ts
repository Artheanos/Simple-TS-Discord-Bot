import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { GuildStorage } from "../../lib/guildStorage";

export default class implements MyCommand {
  about = "Pauses the player";
  alias = ['stop']

  handleMessage({ message }: MyCommandProps) {
    if (!message.guildId) {
      return
    }
    GuildStorage.getItem(message.guildId).playerWrapper.getPlayer()?.pause()
  }
}
