import { Guild, Message, TextChannel } from "discord.js"

export interface TextChannelMessage extends Message {
  channel: TextChannel
  guild: Guild
}
