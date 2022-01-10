import { GuildStorage } from "../lib/guildStorage";
import { Message } from "discord.js";

export const playService = async (message: Message, track: string) => {
  try {
    await GuildStorage.getItem(message.guildId!).scheduler.enqueue(track)
    message.channel.send('Enqueued')
  } catch (e: any) {
    message.channel.send(e.toString())
  }
}
