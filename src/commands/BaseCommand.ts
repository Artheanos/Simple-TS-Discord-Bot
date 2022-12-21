import { Client, Guild, Message, TextChannel } from 'discord.js'

import config from 'config'
import { GuildStorage } from 'lib/guildStorage'
import { TextChannelMessage } from 'interfaces/TextChannelMessage'
import { UserScope } from 'UserScope'
import { awaitIfPromise } from 'utils'

export abstract class BaseCommand {
    async perform() {
        const validationResult = this.validate()

        if (typeof validationResult === 'string') {
            this.reply(validationResult)
            return
        }
        if (!validationResult) {
            return
        }

        const actionResult = await awaitIfPromise(this.action())

        if (actionResult) {
            this.reply(actionResult)
        }
    }

    public static description: string
    protected static minArgsLength?: number
    protected static blacklist?: UserScope
    protected static whitelist?: UserScope
    protected static ownerOnly = false

    protected message: Message
    protected channel: TextChannel
    protected guild: Guild
    protected args: string[]

    constructor(message: TextChannelMessage, protected client: Client) {
        this.message = message
        this.args = message.content.split(' ').slice(1)
        this.channel = message.channel
        this.guild = message.guild
    }

  protected abstract action(): string | void | Promise<string | void>

  protected reply(content: string) {
      return this.message.channel.send(content)
  }

  protected validate(): string | boolean {
      const { minArgsLength, blacklist, whitelist, ownerOnly } = this.klass

      if (minArgsLength && this.args.length < minArgsLength) {
          return 'Wrong number of args'
      }
      if (blacklist?.includes(this.message)) {
          return 'You are in the blacklist'
      }
      if (whitelist?.includes(this.message)) {
          return 'You are not in the whitelist'
      }
      if (ownerOnly && this.message.author.id !== config.ownerId) {
          return 'Owner only'
      }

      return true
  }

  protected getGuildExtension() {
      return GuildStorage.getItem(this.guild.id)
  }

  private get klass() {
      return this.constructor as typeof BaseCommand
  }
}
