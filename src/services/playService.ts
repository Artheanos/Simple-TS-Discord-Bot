import { GuildStorage } from "../lib/guildStorage";
import { Message } from "discord.js";
import { isValidURL, tmpSend } from "../utils";
import { youtubeSearch } from "../lib/youtubeSearch";
import { joinService } from "./joinService";
import { downloadTrack } from "../lib/youtubeDownloader";

export const playService = async (message: Message, track: string) => {
  if (!isValidURL(track)) {
    const videos = await youtubeSearch(track)
    track = videos[0].url
  }
  try {
    const downloadingMessage = await message.channel.send('Downloading')

    const filePath = await downloadTrack(track)
    await GuildStorage.getItem(message.guildId!).scheduler.enqueue(filePath)

    await downloadingMessage.edit('Downloaded 👌')
    setTimeout(() => downloadingMessage.delete(), 1400)
  } catch (e: any) {
    message.channel.send(e.toString())
  }
}

export const joinAndPlay = async (message: Message, track: string) => {
  await joinService(message)
  await playService(message, track)
}

export const joinAndPlayFile = async (message: Message, filePath: string) => {
  await joinService(message)
  await GuildStorage.getItem(message.guildId!).scheduler.enqueue(filePath)
}
