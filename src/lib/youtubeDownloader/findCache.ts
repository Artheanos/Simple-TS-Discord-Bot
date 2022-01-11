import * as fs from 'fs'
import * as path from 'path'
import { join } from "path";


const urlVideoIdRegex = /watch\?v=(.{11})/
const ytVideoUrl = `https://www.youtube.com/watch?v=`

export const videoUrlToId = (videoUrl: string) => videoUrl.match(urlVideoIdRegex)?.[1]
export const videoIdToUrl = (videoId: string) => `${ytVideoUrl}${videoId}`

const fileRegex = /^(.{11})_(.+)\.(.+)$/

const cachePath = path.join(__dirname, 'cache')

export const findCache = (videoId: string, extension: string) => {
  const cacheFiles = fs.readdirSync(cachePath)

  for (let fileName of cacheFiles) {
    const matcher = fileName.match(fileRegex)
    if (!matcher) {
      return
    }
    const [, fileVideoId, , fileExtension] = matcher
    if (fileVideoId === videoId && fileExtension === extension) {
      return join(cachePath, fileName)
    }
  }
}
