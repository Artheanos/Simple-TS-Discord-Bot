import { TextBasedChannel } from 'discord.js'

export async function tmpSend(channel: TextBasedChannel, messageContent: string, deleteAfter: number) {
    const msg = await channel.send(messageContent)
    setTimeout(() => msg.delete(), deleteAfter)
    return msg
}
