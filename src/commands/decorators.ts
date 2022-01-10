import { Collection, Message, Role, Snowflake } from 'discord.js';
import config from "config";
import { MyCommandProps } from 'interfaces/MyCommand';


export function ownerOnly(constructor: Function) {
  const superMethod = constructor.prototype.handleMessage
  constructor.prototype.handleMessage = (props: MyCommandProps) => {
    if (props.message.author.id === config.ownerId)
      superMethod(props)
  }
}

export function blacklist(roles?: string[], ids?: string[]) {
  const scope = new MyScope(roles, ids)

  return (constructor: Function) => {
    const superMethod = constructor.prototype.handleMessage
    constructor.prototype.handleMessage = (props: MyCommandProps) => {
      if (!scope.includes(props.message)) {
        superMethod(props)
      } else {
        props.message.channel.send('You were blacklisted').then((msg) => {
          setTimeout(() => msg.delete(), 4000)
        });
      }
    }
  }
}

export function whitelist(roles?: string[], ids?: string[]) {
  const scope = new MyScope(roles, ids)

  return (constructor: Function) => {
    const cachedMethod = constructor.prototype.handleMessage;
    constructor.prototype.handleMessage = (props: MyCommandProps) => {
      if (scope.includes(props.message)) {
        cachedMethod(props);
      } else {
        props.message.channel.send('You are not in the whitelist').then((msg) => {
          setTimeout(() => msg.delete(), 4000)
        });
      }
    }
  }
}


class MyScope {
  roles?: string[];
  ids?: string[];

  constructor(roles?: string[], ids?: string[]) {
    this.roles = roles;
    this.ids = ids;
  }

  includes(message: Message): boolean {
    if (this.idsInclude(message.author.id)) {
      return true
    }
    return !!(message.member && this.rolesInclude(message.member.roles.cache))
  }

  private idsInclude(authorId: string): boolean {
    return !!this.ids?.includes(authorId);
  }

  private rolesInclude(cache: Collection<Snowflake, Role>): boolean {
    if (this.roles) {
      for (let role of this.roles) {
        if (cache.has(role))
          return true
      }
    }
    return false
  }
}
