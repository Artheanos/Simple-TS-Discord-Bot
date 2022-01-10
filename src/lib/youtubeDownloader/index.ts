import { exec } from 'child_process'
import { join } from 'path'
import { getCachePathByUrl } from "./findCache";
import { FriendlyError } from "../../FriendlyError";

const cachePath = join(__dirname, 'cache')
const fileNameTemplate = '%(id)s_%(title)s.%(ext)s'
const outputPath = join(cachePath, fileNameTemplate)

const outputDestinationRegex = /\[ExtractAudio\] Destination: (.+)\n/
const outputNotFoundRegex = /HTTP Error 404/
const outputUnavailableRegex = /Video unavailable/

type DownloadError = 'unavailable' | 'notFound' | 'unknown'


export const downloadSong = (url: string) => {
  return new Promise((resolve: (outputPath: string) => void, reject: (value: FriendlyError) => void) => {
    const cachedSongPath = getCachePathByUrl(url)
    if (cachedSongPath) {
      return resolve(cachedSongPath)
    }

    const rejectWithError = (msg: string) => reject(new FriendlyError(msg))

    const command = `yt-dlp -x -o "${outputPath}" ${url}`
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
