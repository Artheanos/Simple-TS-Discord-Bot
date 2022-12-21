import { spawnSync } from 'child_process'

export const getTitle = (url: string): string => {
    const command = `${url} --print title`
    const cmd = spawnSync('yt-dlp', command.split(' '))
    return cmd.stdout.toString().trim()
}
