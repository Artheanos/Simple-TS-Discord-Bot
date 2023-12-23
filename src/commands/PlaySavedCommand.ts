import { BaseCommand } from './BaseCommand'
import { prisma } from 'app'
import { PlayUrlService } from 'services/PlayUrlService'
import { PlayYoutubeUrlService } from 'services/PlayYoutubeUrlService'

export class PlaySavedCommand extends BaseCommand {
    static description = 'Plays a saved track'
    static minArgsLength = 1

    async action() {
        const title = this.args[0]
        const track = await prisma.savedTrack.findFirst({ where: { title } })
        if (!track) return `You don't have a track called ${title}`

        if (track.contentUrl.startsWith('https://cdn.discordapp.com')) {
            await new PlayUrlService(this.message, { title: track.title, url: track.contentUrl }).call()
        } else {
            await new PlayYoutubeUrlService(this.message, track.contentUrl).call()
        }
    }
}
