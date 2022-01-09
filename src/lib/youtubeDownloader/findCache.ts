import * as fs from 'fs'
import * as path from 'path'
import { join } from "path";

const fileVideoIdRegex = /^(.+)_/
const urlVideoIdRegex = /watch\?v=(.{11})/

const cachePath = path.join(__dirname, 'cache')

const getCachePathByUrl = (url: string) => {
  const videoId = url.match(urlVideoIdRegex)?.[1]
  const cachedFileName = videoId && findCache(videoId)
  if (cachedFileName) {
    return join(cachePath, cachedFileName)
  }
}

const findCache = (videoId: string): string | undefined => {
  const cacheFiles = fs.readdirSync(cachePath)

  for (let fileName of cacheFiles) {
    const videoIdMatcher = fileName.match(fileVideoIdRegex)
    if (videoIdMatcher?.[1] === videoId) {
      return fileName
    }
  }
}

export { getCachePathByUrl }
