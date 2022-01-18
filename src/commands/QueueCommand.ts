import { BaseCommand } from "./BaseCommand"
import { enumerateArray } from "utils"
import { filePathToTitle } from "lib/youtubeDownloader";

export class QueueCommand extends BaseCommand {
  static description = 'Show currently queued tracks'

  action() {
    const tracks = this.getGuildExtension().scheduler.queue
    return tracks.length ? enumerateArray(tracks.map(filePathToTitle)) : 'Empty queue'
  }
}
