import { TrackScheduler } from "./TrackScheduler";
import { AudioPlayerWrapper } from "./AudioPlayerWrapper";

export class GuildExtension {
  readonly playerWrapper: AudioPlayerWrapper
  readonly scheduler: TrackScheduler

  constructor(guildId: string) {
    this.playerWrapper = new AudioPlayerWrapper(guildId);
    this.scheduler = new TrackScheduler(this.playerWrapper)

    this.playerWrapper.setListener(state => this.scheduler.onPlayerStateChange(state))
  }
}
