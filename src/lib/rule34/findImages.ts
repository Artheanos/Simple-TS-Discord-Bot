import axios from 'axios'
import { URLSearchParams } from 'url'

const urlBuilder = (tags: string, pageId = 0) => {
    const searchParams = new URLSearchParams({
        page: 'dapi',
        s: 'post',
        q: 'index',
        json: '1',
        tags: tags,
        pid: pageId.toString(),
    })
    return `https://api.rule34.xxx/index.php?${searchParams.toString()}`
}

export const findImages = async (query: string) => {
    query = query.split(' ').filter(i => i).join('_')

    console.log(urlBuilder(query))
    const response = await axios.get(urlBuilder(query))
    const rule34Items: Rule34Item[] = response.data || []
    return rule34Items.map(i => i.file_url)
}
