namespace YT {
  export interface SearchResult {
    kind: string
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: PageInfo
    items: Item[]
  }

  export interface PageInfo {
    totalResults: number,
    resultsPerPage: number
  }

  export interface Item {
    kind: string,
    etag: string,
    id: Id,
    snippet: Snippet
  }

  export interface Id {
    kind: string,
    videoId: string
  }

  export interface Snippet {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    // thumbnails: List<Thumbnail>
  }
}
