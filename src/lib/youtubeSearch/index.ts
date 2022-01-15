import axios from "axios";
import config from "config";

import { videoIdToUrl } from 'lib/youtubeDownloader/findCache'

const ytSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${config.youtubeApiToken}`
const ytSearchUrlWithQuery = (q: string) => `${ytSearchUrl}&q=${q}`

const videoResultBuilder = (item: YT.Item): VideoResult => ({
  url: videoIdToUrl(item.id.videoId),
  title: item.snippet.title
})

export const youtubeSearch = async (q: string) => {
  const response = await axios.get(ytSearchUrlWithQuery(q))
  const searchResult: YT.SearchResult = response.data

  return searchResult.items.map(videoResultBuilder)
}
