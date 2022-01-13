import { BaseCommand } from "./BaseCommand"
import { joinAndPlay } from "../services/playService"

export class PlayCommand extends BaseCommand {
  static minArgsLength = 1
  static description = 'Plays the first result form Youtube or a URL (if given a URL)'

  action() {
    joinAndPlay(this.message, this.args[0])
  }
}
