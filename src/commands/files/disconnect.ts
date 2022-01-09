import { MyCommand, MyCommandProps } from "interfaces/MyCommand";
import { MyRandom, Utils } from "../../utils";
import { getVoiceConnection } from "@discordjs/voice";

export default class implements MyCommand {
  about = 'Disconnect from the voice channel';
  alias = ['leave'];

  handleMessage({ message }: MyCommandProps) {
    if (message.guildId) {
      const connection = getVoiceConnection(message.guildId)
      connection?.disconnect()
    }
  }
}
