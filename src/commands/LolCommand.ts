import { prisma } from 'app'
import { BaseCommand } from './BaseCommand'

export class LolCommand extends BaseCommand {
    static description = 'Lolito'

    async action() {
        return 'Hello world'
    }
}
