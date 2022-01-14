import { exec } from 'child_process'
import { join } from 'path'

import { FriendlyError } from "../../FriendlyError";
import { findCache, videoUrlToId } from "./findCache";

export const cachePath = join(__dirname, 'cache')
const fileNameTemplate = '%(id)s_%(title)s.%(ext)s'
const outputPath = join(cachePath, fileNameTemplate)

const outputDestinationRegex = /\[ExtractAudio\] Destination: (.+)\n/
const outputNotFoundRegex = /HTTP Error 404/
const outputUnavailableRegex = /Video unavailable/

export const downloadTrack = (url: string, audioFormat: string = 'opus') => {
  return new Promise((resolve: (outputPath: string) => void, reject: (value: FriendlyError) => void) => {
    const videoId = videoUrlToId(url)
    const cachedSongPath = videoId && findCache(videoId, audioFormat)
    if (cachedSongPath) {
      return resolve(cachedSongPath)
    }

    const rejectWithError = (msg: string) => reject(new FriendlyError(msg))

    const command = `yt-dlp -x --audio-format=${audioFormat} -o "${outputPath}" ${url}`
    exec(command, ((error, stdout, stderr) => {
      if (error) {
        if (stderr.match(outputUnavailableRegex)) {
          return rejectWithError('unavailable')
        }

        if (stderr.match(outputNotFoundRegex)) {
          return rejectWithError('notFound')
        }
      }

      const outputPath = stdout.match(outputDestinationRegex)?.[1]
      if (outputPath) {
        return resolve(outputPath)
      }

      console.log(error)
      return rejectWithError('unknown')
    }))
  })
}
