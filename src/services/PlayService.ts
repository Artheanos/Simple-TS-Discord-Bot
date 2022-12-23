import { Message } from 'discord.js'

import { getTitle, search, stream } from 'lib/yt-dlp'
import { GuildStorage } from 'lib/guildStorage'
import { isValidURL } from 'utils'
import { JoinService } from './JoinService'
import { QueuedTrack } from 'lib/guildStorage/types'

export class PlayService {
    constructor(private message: Message, private track: string) {
    }

    async call() {
        try {
            await new JoinService(this.message).call()
            this.enqueueTrack()
        } catch (e: any) {
            this.message.channel.send(e.toString())
        }
    }

    private async enqueueTrack() {
        const responseMessage = await this.message.channel.send('Downloading')

        const videoInfo = await this.getVideoInfo()
        const scheduler = GuildStorage.getGuildExtension(this.message.guildId!).scheduler
        await scheduler.enqueue(videoInfo)

        if (scheduler.currentTrack) {
            await responseMessage.edit(`Enqueued \`${videoInfo.title}\``)
        } else {
            await responseMessage.edit(`Now playing \`${videoInfo.title}\``)
        }
    }

    private async getVideoInfo(): Promise<QueuedTrack> {
        const video = isValidURL(this.track) ? {
            url: this.track,
            title: getTitle(this.track),
        } : await this.getFirstResultFromYoutube()

        return { ...video, stream: stream(video.url) }
    }

    private async getFirstResultFromYoutube() {
        return (await search(this.track, 1))[0]
    }
}
