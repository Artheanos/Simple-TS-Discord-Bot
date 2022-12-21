import { BaseCommand } from './BaseCommand'

export class ShutdownCommand extends BaseCommand {
    static description = 'Stops the bot'
    static ownerOnly = true

    action() {
        this.client.destroy()
    }
}
