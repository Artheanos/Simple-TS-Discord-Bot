import { exec } from 'child_process'
import { join } from 'path'

const cachePath = join(__dirname, 'cache')
const fileNameTemplate = '%(title)s.%(ext)s'
const destination = join(cachePath, fileNameTemplate)

const outputDestinationRegex = /\[ExtractAudio\] Destination: (.+)\n/
const outputNotFoundRegex = /HTTP Error 404/
const outputUnavailableRegex = /Video unavailable/

type DownloadError = 'unavailable' | 'notFound' | 'unknown'

export const downloadSong = (url: string) => {
  const command = `yt-dlp -x -o "${destination}" ${url}`

  return new Promise((resolve: (outputPath: string) => void, reject: (value: DownloadError) => void) => {
    exec(command, ((error, stdout, stderr) => {
      if (error) {
        if (stderr.match(outputUnavailableRegex)) {
          return reject('unavailable')
        }

        if (stderr.match(outputNotFoundRegex)) {
          return reject('notFound')
        }
      }

      const match = stdout.match(outputDestinationRegex)
      if (match) {
        return resolve(match[1])
      }

      // throw 'unknown'
      return reject('unknown')
    }))
  })
}
