import { Readable } from 'stream'

export type QueuedTrack = VideoResult & {
    stream: Readable
}
