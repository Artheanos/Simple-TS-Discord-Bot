import { prisma } from 'app'
import { BaseCommand } from './BaseCommand'

export class SaveCommand extends BaseCommand {
    static description = 'Save an audio file with a tag for easy access'
    static minArgsLength = 1

    async action() {
        const title = this.args[0]
        try {
            await this.createRecord(title)
            return `The track \`${title}\` has been saved`
        } catch (e) {
            return `You already have the track ${title}`
        }
    }

    validate(): string | true {
        const superValidation = super.validate()
        if (superValidation) return superValidation

        const track = this.message.attachments.first()
        if (!track) {
            return 'This command requires an audio attachment'
        }

        if (!track.contentType?.startsWith('audio/')) {
            return 'This attachment is not an audio file'
        }

        return true
    }

    private async createRecord(title: string) {
        await prisma.savedTrack.create({
            data: {
                contentUrl: this.message.attachments.first()!.url,
                title,
                userId: this.message.author.id,
            },
        })
    }
}
