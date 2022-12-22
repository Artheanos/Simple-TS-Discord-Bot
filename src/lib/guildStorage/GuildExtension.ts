import { AudioPlayerWrapper } from './AudioPlayerWrapper'
import { TrackScheduler } from './TrackScheduler'

export class GuildExtension {
    readonly playerWrapper: AudioPlayerWrapper
    readonly scheduler: TrackScheduler
    aloneTimeout?: ReturnType<typeof setTimeout>

    constructor(guildId: string) {
        this.playerWrapper = new AudioPlayerWrapper(guildId)
        this.scheduler = new TrackScheduler(this.playerWrapper)

        this.playerWrapper.setListener(state => this.scheduler.onPlayerStateChange(state))
    }
}
