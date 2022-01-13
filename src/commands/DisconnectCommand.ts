import { BaseCommand } from "./BaseCommand"
import { getVoiceConnection } from "@discordjs/voice";

export class DisconnectCommand extends BaseCommand {
  static description = 'Disconnect command'

  action() {
    getVoiceConnection(this.guild.id)?.disconnect()
  }
}
