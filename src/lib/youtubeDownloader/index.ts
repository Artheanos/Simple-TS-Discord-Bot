import { exec } from 'child_process'
import { join } from 'path'
import { getCachePathByUrl } from "./findCache";

const cachePath = join(__dirname, 'cache')
const fileNameTemplate = '%(id)s_%(title)s.%(ext)s'
const outputPath = join(cachePath, fileNameTemplate)

const outputDestinationRegex = /\[ExtractAudio\] Destination: (.+)\n/
const outputNotFoundRegex = /HTTP Error 404/
const outputUnavailableRegex = /Video unavailable/

type DownloadError = 'unavailable' | 'notFound' | 'unknown'


export const downloadSong = (url: string) => {
  return new Promise((resolve: (outputPath: string) => void, reject: (value: DownloadError) => void) => {

    const cachedSongPath = getCachePathByUrl(url)
    if (cachedSongPath) {
      return resolve(cachedSongPath)
    }

    const command = `yt-dlp -x -o "${outputPath}" ${url}`
    exec(command, ((error, stdout, stderr) => {
      if (error) {
        if (stderr.match(outputUnavailableRegex)) {
          return reject('unavailable')
        }

        if (stderr.match(outputNotFoundRegex)) {
          return reject('notFound')
        }
      }

      const outputPath = stdout.match(outputDestinationRegex)?.[1]
      if (outputPath) {
        return resolve(outputPath)
      }

      console.log(error)
      return reject('unknown')
    }))
  })
}
