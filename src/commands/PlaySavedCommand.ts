import { BaseCommand } from './BaseCommand'
import { prisma } from 'app'
import { PlayDiscordUrlService } from 'services/PlayDiscordUrlService'
import { PlayYoutubeUrlService } from 'services/PlayYoutubeUrlService'

export class PlaySavedCommand extends BaseCommand {
    static description = 'Plays a saved track'
    static minArgsLength = 1

    async action() {
        const title = this.args[0]
        const track = await prisma.savedTrack.findFirst({ where: { title } })
        if (!track) return `You don't have a track called ${title}`

        if (track.contentUrl.startsWith('https://cdn.discordapp.com')) {
            await new PlayDiscordUrlService(this.message, track).call()
        } else {
            await new PlayYoutubeUrlService(this.message, track.contentUrl).call()
        }
    }
}
