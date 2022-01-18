import { AudioPlayerState, AudioPlayerStatus, createAudioResource, StreamType } from "@discordjs/voice"
import { AudioPlayerWrapper } from "./AudioPlayerWrapper"

export class TrackScheduler {
  queue: string[] = []
  currentTrack?: string

  constructor(private readonly playerWrapper: AudioPlayerWrapper) {
  }

  get player() {
    return this.playerWrapper.getPlayer()
  }

  async enqueue(filePath: string) {
    this.queue.push(filePath)
    if (!this.isPlaying()) {
      this.playNext()
    }
  }

  playNext() {
    delete this.currentTrack
    const player = this.player
    if (player) {
      const nextSong = this.queue.shift()
      if (nextSong) {
        player.play(TrackScheduler.createAudioResource(nextSong))
        this.currentTrack = nextSong
      }
    }
  }

  onPlayerStateChange(newState: AudioPlayerState) {
    if (newState.status === AudioPlayerStatus.Idle) {
      this.playNext()
    }
  }

  private isPlaying() {
    return this.player?.state.status === AudioPlayerStatus.Playing
  }

  private static createAudioResource(filePath: string) {
    const options = filePath.endsWith('.opus') ? { inputType: StreamType.Opus } : {}

    return createAudioResource(filePath, options)
  }
}
