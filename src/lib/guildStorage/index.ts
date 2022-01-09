import { AudioPlayer } from "@discordjs/voice";

type GuildExtension = {
  player: AudioPlayer
}

export class GuildStorage {
  static guilds: Record<string, Partial<GuildExtension>> = {}

  static getGuildExtension(guildId: string) {
    if (!(guildId in this.guilds)) {
      this.guilds[guildId] = {}
    }

    return this.guilds[guildId]
  }
}
