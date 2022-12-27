import { Message } from 'discord.js'
import { SavedTrack } from '@prisma/client'
import { spawn } from 'child_process'

import { EnqueueTrackService } from 'services/EnqueueTrackService'
import { JoinService } from './JoinService'
import { Readable } from 'stream'

export class PlayDiscordUrlService {
    constructor(private message: Message, private track: SavedTrack) {
    }

    async call() {
        try {
            await new JoinService(this.message).call()
            await this.enqueueTrack()
        } catch (e: any) {
            this.message.channel.send(e.toString())
        }
    }

    async enqueueTrack() {
        await new EnqueueTrackService(
            this.message,
            { title: this.track.title, stream: this.createStream() },
        ).call()
    }

    createStream(): Readable {
        return spawn('curl', [this.track.contentUrl, '-o', '-']).stdout
    }
}
