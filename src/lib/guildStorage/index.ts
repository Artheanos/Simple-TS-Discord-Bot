import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  NoSubscriberBehavior
} from "@discordjs/voice";
import { downloadSong } from "../youtubeDownloader";

class MyQueue {
  songs: string[] = []

  constructor(private parent: GuildExtension) {
  }

  async add(url: string) {
    try {
      const outputPath = await downloadSong(url)
      this.songs.push(outputPath)
      if (!this.isPlaying()) {
        this.playNext()
      }
    } catch (e) {
      return e
    }
  }

  playNext() {
    const player = this.player
    if (player) {
      const nextSong = this.songs.shift()
      if (nextSong) {
        player.play(createAudioResource(nextSong))
      }
    }
  }

  private isPlaying() {
    return this.player?.state.status === AudioPlayerStatus.Playing;
  }

  private get player() {
    return this.parent.getPlayer()
  }
}

class GuildExtension {
  guildId: string
  player?: AudioPlayer
  queue: MyQueue

  get connection() {
    return getVoiceConnection(this.guildId)
  }

  constructor(guildId: string) {
    this.guildId = guildId;
    this.queue = new MyQueue(this)
  }

  getPlayer(): AudioPlayer | undefined {
    if (this.player) {
      return this.player
    }

    this.createSubscribedPlayer()

    return this.player
  }

  private createSubscribedPlayer() {
    const connection = this.connection

    if (!connection) {
      throw `Client is not in any voice channel belonging to the guild#${this.guildId}`
    }

    connection.on('stateChange', (oldState, newState) => {
      if (newState.status === 'disconnected' || newState.status === 'destroyed') {
        delete this.player
      }
    })

    const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause, }, });
    connection?.subscribe(player)
    player.on(AudioPlayerStatus.Idle, () => this.queue.playNext())
    this.player = player
  }
}

export class GuildStorage {
  static guilds: Record<string, GuildExtension> = {}

  static getGuildExtension(guildId: string) {
    if (!(guildId in this.guilds)) {
      this.guilds[guildId] = new GuildExtension(guildId)
    }

    return this.guilds[guildId]
  }
}
