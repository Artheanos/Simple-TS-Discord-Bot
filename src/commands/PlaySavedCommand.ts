import { BaseCommand } from './BaseCommand'
import { prisma } from 'app'
import { enumerateArray } from 'utils/arrays'
import { spawn } from 'child_process'
import { Readable } from 'stream'
import { PlayDiscordUrlService } from 'services/PlayDiscordUrlService'

export class PlaySavedCommand extends BaseCommand {
    static description = 'Plays a saved track'
    static minArgsLength = 1

    async action() {
        const title = this.args[0]
        const track = await prisma.savedTrack.findFirst({ where: { title } })
        if (!track) return `You don't have a track called ${title}`

        await new PlayDiscordUrlService(this.message, track).call()
    }
}
