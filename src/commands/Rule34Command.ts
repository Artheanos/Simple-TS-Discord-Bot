import { BaseCommand } from './BaseCommand'
import { findImages } from 'lib/rule34'
import { choice } from 'utils/random'

export class Rule34Command extends BaseCommand {
    static description = 'Search for pp on https://api.rule34.xxx/'
    static minArgsLength = 1

    async action() {
        const images: string[] = await findImages(this.args.join(' '))
        return images ? choice(images) : 'Not found'
    }
}
