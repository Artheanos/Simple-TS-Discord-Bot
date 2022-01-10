import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { AudioPlayer } from "@discordjs/voice";

export default class implements MyCommand {
  about = 'Shows the song which is currently being played'
  alias = ['current']

  handleMessage({ message }: MyCommandProps) {
    //TODO
  }
}
