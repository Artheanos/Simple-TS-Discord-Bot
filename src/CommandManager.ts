import { Client, Message, TextBasedChannel, TextChannel } from 'discord.js'

import config from 'config'
import { FriendlyError } from 'FriendlyError'
import { TextChannelMessage } from 'interfaces/TextChannelMessage'
import { routes } from 'routes'
import { tmpSend } from 'utils'

import { HelpCommand } from 'commands/HelpCommand'

routes['help'] = HelpCommand

const unknownCommandMessage = (channel: TextBasedChannel, commandName: string): void => {
    tmpSend(channel, `Unknown command \`${commandName}\``, 4000)
}

export class CommandManager {
    constructor(private client: Client) {
    }

    onCreateMessage(message: Message) {
        if (!message.content.startsWith(config.prefix)) {
            return
        }

        const commandName = CommandManager.resolveCommandName(message)

        if (commandName in routes && message.channel instanceof TextChannel) {
            this.performCommand(commandName, message as TextChannelMessage)
        } else if (config.unknownCommandMessage) {
            unknownCommandMessage(message.channel, commandName)
        }
    }

    private static resolveCommandName(message: Message) {
        const [prefixedCommand] = message.content.split(' ')
        const commandName = prefixedCommand.slice(config.prefix.length)
        return config.caseSensitive ? commandName : commandName.toLowerCase()
    }

    private performCommand(name: string, message: TextChannelMessage) {
        const commandClass = routes[name]
        const commandProps = [message as TextChannelMessage, this.client]
        const commandInstance = new commandClass(...commandProps)

        commandInstance.perform().catch(e => {
            if (e instanceof FriendlyError && e.message) {
                message.channel.send(e.message)
            }
        })
    }
}
