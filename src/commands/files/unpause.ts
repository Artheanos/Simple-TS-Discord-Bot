import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { GuildStorage } from "../../lib/guildStorage";

export default class implements MyCommand {
  about = "Resumes the player";
  alias = ['resume']

  handleMessage({ message }: MyCommandProps) {
    if (!message.guildId) {
      return
    }
    GuildStorage.getItem(message.guildId).playerWrapper.getPlayer()?.unpause()
  }
}
