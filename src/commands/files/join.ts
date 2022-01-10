import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { joinService } from "../../services/joinService";


export default class implements MyCommand {
  about = "Joins voice channel you are currently in";

  async handleMessage({ message }: MyCommandProps) {
    if (message.member?.voice) {
      await joinService(message)
    } else {
      message.channel.send('You are not in a voice channel')
    }
  }
}
