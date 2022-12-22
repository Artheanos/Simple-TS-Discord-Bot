import { eachSlice } from 'utils'
import { spawnSync } from 'child_process'

const RESULT_SIZE = 5

const ytDlpSearch = (phrase: string): string => {
    const args = `ytsearch${RESULT_SIZE}:"${phrase}" --flat-playlist --print title,url`
    const cmd = spawnSync('yt-dlp', args.split(' '))
    return cmd.stdout.toString().trim()
}

export const youtubeSearch = (phrase: string): VideoResult[] => {
    const result: VideoResult[] = []
    const lines = ytDlpSearch(phrase).split('\n')
    for (const slice of eachSlice(lines, 2)) {
        const [title, url] = slice
        result.push({ title, url })
    }
    return result
}
