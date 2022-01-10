import { GuildStorage } from "../lib/guildStorage";
import { Message } from "discord.js";
import { isValidURL, tmpSend } from "../utils";
import { youtubeSearch } from "../lib/youtubeSearch";
import { joinService } from "./joinService";

export const playService = async (message: Message, track: string) => {
  if (!isValidURL(track)) {
    const videos = await youtubeSearch(track)
    track = videos[0].url
  }
  try {
    const downloadingMessage = await message.channel.send('Downloading')
    await GuildStorage.getItem(message.guildId!).scheduler.enqueue(track)
    await downloadingMessage.edit('Downloaded 👌')
    setTimeout(() => downloadingMessage.delete(), 1000)
  } catch (e: any) {
    message.channel.send(e.toString())
  }
}

export const joinAndPlay = async (message: Message, track: string) => {
  await joinService(message)
  await playService(message, track)
}
