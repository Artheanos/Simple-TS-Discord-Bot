import { GuildExtension } from "./GuildExtension";

export class GuildStorage {
  static guilds: Record<string, GuildExtension> = {}

  static getItem(guildId: string) {
    if (!(guildId in this.guilds)) {
      this.guilds[guildId] = new GuildExtension(guildId)
    }

    return this.guilds[guildId]
  }
}
