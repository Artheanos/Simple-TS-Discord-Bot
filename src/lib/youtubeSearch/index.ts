import { Readable } from 'stream'
import { spawn } from 'child_process'

const RESULT_SIZE = 5

export const youtubeSearch = async (phrase: string): Promise<VideoResult[]> => {
    return (await ytDlpSearch(phrase)).map(entry => {
        const [title, url] = entry.split('\n')
        return { title: title.toString(), url: url.toString() }
    })
}

const ytDlpSearch = async (phrase: string): Promise<string[]> => {
    const args = `ytsearch${RESULT_SIZE}:"${phrase}" --flat-playlist --print %(title)s\n%(url)s`
    const cmd = spawn('yt-dlp', args.split(' '))
    return await readStdout(cmd.stdout)
}

const readStdout = (readable: Readable): Promise<string[]> => {
    return new Promise((resolve) => {
        const result: string[] = []
        readable.on('data', (d: Buffer) => result.push(d.toString()))
        readable.on('close', () => resolve(result))
    })
}
