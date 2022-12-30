import { Readable } from 'stream'
import { spawn } from 'child_process'

export const search = async (phrase: string, size: number): Promise<VideoResult[]> => {
    return (await runSearchCommand(phrase, size)).map(entry => {
        const [title, url] = entry.split('\n')
        return { title: title.toString(), url: url.toString() }
    })
}

const runSearchCommand = async (phrase: string, size: number): Promise<string[]> => {
    const cmd = spawn('yt-dlp', [
        `ytsearch${size}:${phrase}`, '--flat-playlist', '--print', '%(title)s\n%(url)s',
    ])
    return await readStdout(cmd.stdout)
}

export const readStdout = (readable: Readable): Promise<string[]> => {
    return new Promise((resolve) => {
        const result: string[] = []
        readable.on('data', (buffer: Buffer) => result.push(buffer.toString()))
        readable.on('close', () => resolve(result))
    })
}
