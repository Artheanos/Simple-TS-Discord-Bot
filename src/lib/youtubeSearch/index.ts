import axios from "axios";
import config from "config";

const ytSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${config.youtubeApiToken}`
const ytSearchUrlWithQuery = (q: string) => `${ytSearchUrl}&q=${q}`

export type VideoResult = {
  url: string
  title: string
}

const ytVideoUrl = `https://www.youtube.com/watch?v=`
const videoResultBuilder = (item: YT.Item): VideoResult => ({
  url: `${ytVideoUrl}${item.id.videoId}`,
  title: item.snippet.title
})

export const youtubeSearch = async (q: string) => {
  const response = await axios.get(ytSearchUrlWithQuery(q))
  const searchResult: YT.SearchResult = response.data

  return searchResult.items.map(videoResultBuilder)
}
