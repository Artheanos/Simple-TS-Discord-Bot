import path = require("path")

import { enumerateArray } from "utils"
import { BaseCommand } from "./BaseCommand"
import { UserScope } from "UserScope";

export class QueueCommand extends BaseCommand {
  static blacklist = new UserScope({ userIds: ['262610764597166081'] })
  static description = 'Show currently queued tracks'

  action() {
    const tracks = this.tracks
    return tracks.length ? enumerateArray(tracks.map(QueueCommand.filePathToTitle)) : 'Empty queue'
  }

  private get tracks() {
    return this.getGuildExtension().scheduler.tracks
  }

  private static filePathToTitle = (filePath: string): string => {
    const fileName = path.basename(filePath, '.opus')
    const matcher = fileName.match(/(.{11})_(.*)/)
    if (matcher) {
      const [, , title] = matcher
      return title
    }
    return ''
  }
}
