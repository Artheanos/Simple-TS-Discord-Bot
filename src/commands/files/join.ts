import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { joinVoice } from "../../services/joinVoice";


export default class implements MyCommand {
  about = "Joins voice channel you are currently in";

  handleMessage({ message }: MyCommandProps) {
    if (message.member?.voice) {
      joinVoice(message)
    } else {
      message.channel.send('You are not in a voice channel')
    }
  }
}
