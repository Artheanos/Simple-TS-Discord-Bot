import { GuildStorage } from "../lib/guildStorage";
import { Message } from "discord.js";
import { isValidURL } from "../utils";
import { youtubeSearch } from "../lib/youtubeSearch";
import { joinService } from "./joinService";

export const playService = async (message: Message, track: string) => {
  if (!isValidURL(track)) {
    const videos = await youtubeSearch(track)
    track = videos[0].url
  }
  try {
    await GuildStorage.getItem(message.guildId!).scheduler.enqueue(track)
    message.channel.send('Enqueued')
  } catch (e: any) {
    message.channel.send(e.toString())
  }
}

export const joinAndPlay = async (message: Message, track: string) => {
  await joinService(message)
  await playService(message, track)
}
