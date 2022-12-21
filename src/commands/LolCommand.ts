import { BaseCommand } from './BaseCommand'

export class LolCommand extends BaseCommand {
    static description = 'Lolito'

    action() {
        return 'Hello world'
    }
}
