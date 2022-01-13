import { BaseCommand } from "./BaseCommand"
import { joinService } from "../services/joinService"

export class JoinCommand extends BaseCommand {
  static description = 'Join the voice channel you are currently in'

  action() {
    joinService(this.message)
  }
}
