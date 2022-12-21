import { BaseCommand } from './BaseCommand'
import { PlayService } from 'services/PlayService'

export class PlayCommand extends BaseCommand {
    static minArgsLength = 1
    static description = 'Plays the first result form Youtube or a URL (if given a URL)'

    async action() {
        await new PlayService(this.message, this.args.join(' ')).call()
    }
}
