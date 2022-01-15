import { AudioPlayerState, AudioPlayerStatus, createAudioResource, StreamType } from "@discordjs/voice"
import { AudioPlayerWrapper } from "./AudioPlayerWrapper"

export class TrackScheduler {
  tracks: string[] = []

  constructor(private readonly playerWrapper: AudioPlayerWrapper) {
  }

  get player() {
    return this.playerWrapper.getPlayer()
  }

  async enqueue(filePath: string) {
    this.tracks.push(filePath)
    if (!this.isPlaying()) {
      this.playNext()
    }
  }

  playNext() {
    const player = this.player
    if (player) {
      const nextSong = this.tracks.shift()
      if (nextSong) {
        player.play(TrackScheduler.createAudioResource(nextSong))
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
