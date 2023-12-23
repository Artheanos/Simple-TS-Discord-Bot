import { BaseCommand } from './BaseCommand'
import * as myinstants from 'lib/myinstants'
import { PlayUrlService } from 'services/PlayUrlService'

export class MyInstantsCommand extends BaseCommand {
    static description = `Search for mp3s on ${myinstants.BASE_URL}`
    static minArgsLength = 1

    async action(): Promise<string | void> {
        const track = await this.getTrack()
        if (!track) return 'No results'

        await new PlayUrlService(this.message, track).call()
    }

    async getTrack(): Promise<VideoResult | null> {
        const mp3s = await myinstants.findMp3s(this.args.join(' '))
        if (mp3s.length === 0) return null

        return {
            url: myinstants.getMediaUrl(mp3s[0]),
            title: mp3s[0].split('/').at(-1) || 'idk',
        }
    }
}
