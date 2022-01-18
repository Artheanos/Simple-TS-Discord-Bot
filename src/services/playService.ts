import { Message } from "discord.js"

import { GuildStorage } from "lib/guildStorage"
import { downloadTrack, filePathToTitle } from "lib/youtubeDownloader"
import { isValidURL } from "utils"
import { joinService } from "./joinService"
import { youtubeSearch } from "lib/youtubeSearch"

export const playService = async (message: Message, track: string) => {
  if (!isValidURL(track)) {
    const videos = await youtubeSearch(track)
    track = videos[0].url
  }
  try {
    const responseMessage = await message.channel.send('Downloading')
    const filePath = await downloadTrack(track)
    const trackTitle = filePathToTitle(filePath)
    const scheduler = await GuildStorage.getItem(message.guildId!).scheduler

    await scheduler.enqueue(filePath)

    if (scheduler.currentTrack) {
      await responseMessage.edit(`Enqueued \`${trackTitle}\``)
    } else {
      await responseMessage.edit(`Now playing \`${trackTitle}\``)
    }

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
